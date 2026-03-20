"use client";

import { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import AdBanner from "@/components/AdBanner";
import { allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { shuffle } from "@/lib/shuffle";
import { Flame, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [flashDeals, setFlashDeals] = useState<typeof allProducts>([]);
  const [topRated, setTopRated] = useState<typeof allProducts>([]);
  const [dailyPicks, setDailyPicks] = useState<typeof allProducts>([]);

  useEffect(() => {
    const shuffled = shuffle(allProducts);
    setFlashDeals(
      shuffle(allProducts.filter((p) => p.discount && p.discount >= 15)).slice(0, 10)
    );
    setTopRated(
      shuffle(allProducts.filter((p) => p.rating >= 4.0)).slice(0, 10)
    );
    setDailyPicks(shuffled.slice(0, 30));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroBanner />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Categorias</h2>
            <Link href="/busca?q=" className="text-xs text-orange-500 hover:underline">
              Ver todas &gt;
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-2">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="text-orange-500" size={20} />
                <h2 className="text-base font-bold text-orange-600">OFERTAS RELÂMPAGO</h2>
              </div>
              <Link href="/ofertas" className="text-xs text-orange-500 hover:underline">
                Ver todas &gt;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <AdBanner />
      </div>

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-2">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="text-orange-500" size={20} />
              <h2 className="text-base font-bold text-gray-900">Mais Bem Avaliados</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {topRated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Daily Discover */}
      {dailyPicks.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2">
              <Flame className="text-orange-500" size={20} />
              <h2 className="text-base font-bold text-orange-600 uppercase">Descobertas do Dia</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {dailyPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="/ofertas"
              className="rounded-lg border border-orange-500 px-8 py-2.5 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-50"
            >
              Ver Mais Produtos
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
