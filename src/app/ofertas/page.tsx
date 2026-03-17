"use client";

import { useState, useMemo } from "react";
import { allProducts, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight, Flame } from "lucide-react";

type SortOption = "maior-desconto" | "menor-preco" | "mais-avaliados";
type SourceFilter = "todos" | "mercadolivre" | "amazon" | "shopee";

export default function OfertasPage() {
  const [sortBy, setSortBy] = useState<SortOption>("maior-desconto");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("todos");
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  const allDeals = useMemo(() => {
    return allProducts.filter((p) => p.discount && p.discount > 0);
  }, []);

  const filteredDeals = useMemo(() => {
    let result: Product[] = [...allDeals];

    if (sourceFilter !== "todos") {
      result = result.filter((p) => p.source === sourceFilter);
    }

    if (freeShippingOnly) {
      result = result.filter((p) => p.freeShipping);
    }

    switch (sortBy) {
      case "maior-desconto":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "menor-preco":
        result.sort((a, b) => a.price - b.price);
        break;
      case "mais-avaliados":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [allDeals, sourceFilter, freeShippingOnly, sortBy]);

  const sourceButtons: { key: SourceFilter; label: string }[] = [
    { key: "todos", label: "Todos" },
    { key: "mercadolivre", label: "Mercado Livre" },
    { key: "amazon", label: "Amazon" },
    { key: "shopee", label: "Shopee" },
  ];

  const sortButtons: { key: SortOption; label: string }[] = [
    { key: "maior-desconto", label: "Maior Desconto" },
    { key: "menor-preco", label: "Menor Preço" },
    { key: "mais-avaliados", label: "Mais Avaliados" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Início</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-gray-900">Ofertas do Dia</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Flame className="text-red-500" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ofertas do Dia</h1>
            <p className="mt-1 text-gray-500">
              Os melhores descontos em um só lugar — até <span className="font-bold text-red-500">45% OFF</span>
            </p>
          </div>
        </div>
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

      {/* Sort */}
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

      <p className="mb-4 text-sm text-gray-400">
        {filteredDeals.length} oferta{filteredDeals.length !== 1 ? "s" : ""} encontrada{filteredDeals.length !== 1 ? "s" : ""}
      </p>

      {/* Ad */}
      <div className="mb-8">
        <AdBanner />
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredDeals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
