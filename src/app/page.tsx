import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import AdBanner from "@/components/AdBanner";
import { allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { Flame, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const flashDeals = allProducts.filter((p) => p.discount && p.discount >= 30).slice(0, 10);
  const topRated = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const dailyPicks = allProducts.slice(0, 30);

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

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <AdBanner />
      </div>

      {/* Top Rated */}
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

      {/* Daily Discover */}
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
    </div>
  );
}
