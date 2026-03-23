import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { allProducts } from "@/data/products";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CategoryProductsClient from "./CategoryProductsClient";

const SITE_URL = "https://marketpaycommerce.com.br";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Categoria não encontrada" };

  const count = allProducts.filter((p) => p.categorySlug === slug).length;
  const title = `${category.name} — Ofertas e Promoções | MarketPay`;
  const description = `${count}+ produtos de ${category.name} com os melhores preços. ${category.description}. Compare preços no Mercado Livre, Amazon e Shopee.`;
  const url = `${SITE_URL}/categoria/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "MarketPay",
      type: "website",
      locale: "pt_BR",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = allProducts.filter((p) => p.categorySlug === slug);

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
