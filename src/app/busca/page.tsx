"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight, SearchX } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.seller.toLowerCase().includes(query.toLowerCase()) ||
          p.features.some((f) => f.toLowerCase().includes(query.toLowerCase()))
      )
    : products;

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
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
        <button className="shrink-0 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
          Todos
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Menor Preço
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Maior Desconto
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Mais Avaliados
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Frete Grátis
        </button>
      </div>

      {/* Ad */}
      <div className="mb-8">
        <AdBanner />
      </div>

      {/* Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX size={48} className="text-gray-300" />
          <p className="mt-4 text-lg font-medium text-gray-600">
            Nenhum produto encontrado para &ldquo;{query}&rdquo;
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
