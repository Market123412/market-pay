import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import AdBanner from "@/components/AdBanner";
import { allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { Flame, TrendingUp, Tag } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredProducts = allProducts.filter((p) => p.discount && p.discount >= 30).slice(0, 8);
  const topRated = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const recentProducts = allProducts.slice(0, 12);

  return (
    <>
      <HeroBanner />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>
          <Link href="/busca?q=" className="text-sm font-medium text-emerald-600 hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4">
        <AdBanner />
      </div>

      {/* Featured - Best Discounts */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center gap-2">
          <Flame className="text-red-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Ofertas Imperdíveis</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Mais Bem Avaliados</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <AdBanner />
      </div>

      {/* All Products */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center gap-2">
          <Tag className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Todos os Produtos</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
