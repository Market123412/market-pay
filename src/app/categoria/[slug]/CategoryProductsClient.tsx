"use client";

import { useState, useMemo } from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

type SortOption = "relevancia" | "menor-preco" | "maior-desconto" | "mais-avaliados";
type SourceFilter = "todos" | "mercadolivre" | "amazon" | "shopee";

interface Props {
  initialProducts: Product[];
  categoryName: string;
}

export default function CategoryProductsClient({ initialProducts, categoryName }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("todos");
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

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
  }, [initialProducts, sourceFilter, freeShippingOnly, sortBy]);

  const sourceButtons: { key: SourceFilter; label: string }[] = [
    { key: "todos", label: "Todos" },
    { key: "mercadolivre", label: "Mercado Livre" },
    { key: "amazon", label: "Amazon" },
    { key: "shopee", label: "Shopee" },
  ];

  const sortButtons: { key: SortOption; label: string }[] = [
    { key: "relevancia", label: "Todos" },
    { key: "menor-preco", label: "Menor Preço" },
    { key: "maior-desconto", label: "Maior Desconto" },
    { key: "mais-avaliados", label: "Mais Avaliados" },
  ];

  return (
    <>
      {/* Source Filters */}
      <div className="mb-4 flex items-center gap-3 overflow-x-auto pb-2">
        <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-500">
          <SlidersHorizontal size={14} />
          Filtros
        </span>
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

      {/* Count */}
      <p className="mb-4 text-sm text-gray-400">
        {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-gray-600">
            Nenhum produto encontrado em {categoryName} com esses filtros.
          </p>
          <p className="mt-2 text-sm text-gray-400">Tente remover alguns filtros.</p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Voltar ao Início
          </Link>
        </div>
      )}
    </>
  );
}
