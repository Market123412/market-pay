import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CategoryProductsClient from "./CategoryProductsClient";

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
      </div>

      {/* Ad */}
      <div className="mb-8">
        <AdBanner />
      </div>

      {/* Client-side filterable products */}
      <CategoryProductsClient initialProducts={categoryProducts} categoryName={category.name} />
    </div>
  );
}
