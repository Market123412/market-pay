import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.categorySlug === slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">
          Início
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-gray-900">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <p className="mt-1 text-gray-500">{category.description}</p>
        <p className="mt-1 text-sm text-gray-400">
          {categoryProducts.length} produto{categoryProducts.length !== 1 ? "s" : ""} encontrado{categoryProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters bar */}
      <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
        <button className="flex shrink-0 items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <SlidersHorizontal size={14} />
          Filtros
        </button>
        <button className="shrink-0 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
          Todos
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Mercado Livre
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Amazon
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Shopee
        </button>
        <button className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Frete Grátis
        </button>
      </div>

      {/* Ad */}
      <div className="mb-8">
        <AdBanner />
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-gray-600">Nenhum produto encontrado nesta categoria.</p>
          <p className="mt-2 text-sm text-gray-400">Novos produtos são adicionados frequentemente!</p>
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
