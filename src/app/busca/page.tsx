"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { products as localProducts, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight, SearchX, Loader2 } from "lucide-react";

type SortOption = "relevancia" | "menor-preco" | "maior-desconto" | "mais-avaliados";
type SourceFilter = "todos" | "mercadolivre" | "amazon" | "shopee";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("todos");
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  const fetchFromApi = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}&limit=40`);
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        const mapped: Product[] = data.products.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          title: p.title as string,
          description: (p.title as string) || "",
          price: p.price as number,
          originalPrice: p.originalPrice as number | undefined,
          discount: p.discount as number | undefined,
          image: p.image as string,
          images: (p.images as string[]) || [p.image as string],
          category: "",
          categorySlug: "",
          source: p.source as "mercadolivre" | "amazon" | "shopee",
          affiliateUrl: p.url as string,
          rating: (p.rating as number) || 0,
          reviewCount: (p.reviewCount as number) || 0,
          reviews: [],
          freeShipping: (p.freeShipping as boolean) || false,
          seller: (p.seller as string) || "",
          features: (p.features as string[]) || [],
        }));
        setApiProducts(mapped);
      }
    } catch {
      // API falhou, vamos usar dados locais
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      fetchFromApi(query);
    } else {
      setSearched(true);
    }
  }, [query, fetchFromApi]);

  // Combinar produtos locais filtrados + produtos da API
  const localFiltered = useMemo(() => {
    if (!query.trim()) return localProducts;
    return localProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.seller.toLowerCase().includes(query.toLowerCase()) ||
        p.features.some((f) => f.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  const allProducts = useMemo(() => {
    const apiIds = new Set(apiProducts.map((p) => p.id));
    const combined = [...apiProducts, ...localFiltered.filter((p) => !apiIds.has(p.id))];
    return combined;
  }, [apiProducts, localFiltered]);

  // Aplicar filtros
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (sourceFilter !== "todos") {
      result = result.filter((p) => p.source === sourceFilter);
    }

    if (freeShippingOnly) {
      result = result.filter((p) => p.freeShipping);
    }

    switch (sortBy) {
      case "menor-preco":
        result.sort((a, b) => a.price - b.price);
        break;
      case "maior-desconto":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "mais-avaliados":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [allProducts, sourceFilter, freeShippingOnly, sortBy]);

  const sortButtons: { key: SortOption; label: string }[] = [
    { key: "relevancia", label: "Todos" },
    { key: "menor-preco", label: "Menor Preço" },
    { key: "maior-desconto", label: "Maior Desconto" },
    { key: "mais-avaliados", label: "Mais Avaliados" },
  ];

  const sourceButtons: { key: SourceFilter; label: string }[] = [
    { key: "todos", label: "Todos" },
    { key: "mercadolivre", label: "Mercado Livre" },
    { key: "amazon", label: "Amazon" },
    { key: "shopee", label: "Shopee" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Início</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-gray-900">Busca</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {query ? (
            <>
              Resultados para &ldquo;<span className="text-emerald-600">{query}</span>&rdquo;
            </>
          ) : (
            "Todos os Produtos"
          )}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Buscando nos melhores sites...
            </span>
          ) : (
            `${filteredProducts.length} produto${filteredProducts.length !== 1 ? "s" : ""} encontrado${filteredProducts.length !== 1 ? "s" : ""}`
          )}
        </p>
      </div>

      {/* Source Filters */}
      <div className="mb-4 flex items-center gap-3 overflow-x-auto pb-2">
        {sourceButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setSourceFilter(btn.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              sourceFilter === btn.key
                ? "bg-emerald-600 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {btn.label}
          </button>
        ))}
        <button
          onClick={() => setFreeShippingOnly(!freeShippingOnly)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            freeShippingOnly
              ? "bg-emerald-600 text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Frete Grátis
        </button>
      </div>

      {/* Sort Buttons */}
      <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
        {sortButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setSortBy(btn.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              sortBy === btn.key
                ? "bg-emerald-600 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Ad */}
      <div className="mb-8">
        <AdBanner />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
            <p className="text-sm text-gray-500">Buscando ofertas no Mercado Livre, Amazon e Shopee...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      )}

      {!loading && searched && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX size={48} className="text-gray-300" />
          <p className="mt-4 text-lg font-medium text-gray-600">
            Nenhum produto encontrado{query ? ` para "${query}"` : ""}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Tente buscar com outros termos ou explore nossas categorias.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Voltar ao Início
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
