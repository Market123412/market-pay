import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { sourceLabels, formatPrice, getAffiliateUrl } from "@/lib/affiliate";
import AdBanner from "@/components/AdBanner";
import ProductCard from "@/components/ProductCard";
import ProductImageGallery from "./ProductImageGallery";
import ShuffledRecommendations from "./ShuffledRecommendations";
import AffiliateButton from "@/components/AffiliateButton";
import {
  ChevronRight,
  ExternalLink,
  Truck,
  Shield,
  Star,
  ThumbsUp,
} from "lucide-react";

const SITE_URL = "https://marketpaycommerce.com.br";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  // Only pre-render first 50 products at build time to avoid Vercel memory limits
  // Remaining ~8000 products are generated on-demand (ISR) on first visit
  return allProducts.slice(0, 50).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);
  if (!product) return { title: "Produto não encontrado" };

  const title = `${product.title} | MarketPay`;
  const description = `${product.title} por ${formatPrice(product.price)}${product.discount ? ` com ${product.discount}% OFF` : ""}. Frete ${product.freeShipping ? "Grátis" : "disponível"}. Compare preços no Mercado Livre, Amazon e Shopee.`;
  const url = `${SITE_URL}/produto/${product.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "MarketPay",
      images: [{ url: product.image, width: 600, height: 600, alt: product.title }],
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const affiliateLink = getAffiliateUrl(product.affiliateUrl, product.id, product.title);

  const soldText = product.reviewCount > 1000
    ? `${(product.reviewCount / 1000).toFixed(0)}mil+`
    : `${product.reviewCount}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    url: `${SITE_URL}/produto/${product.id}`,
    brand: { "@type": "Brand", name: product.seller },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: product.seller },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-[1400px] px-4 py-3 flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-orange-600">Início</Link>
        <ChevronRight size={12} />
        <Link href={`/categoria/${product.categorySlug}`} className="hover:text-orange-600">
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-700 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main layout: product + sidebar */}
      <div className="mx-auto max-w-[1400px] px-4 pb-8">
        <div className="flex gap-4">
          {/* Left: main content */}
          <div className="flex-1 min-w-0">
            <div className="rounded-lg bg-white p-4 shadow-sm lg:p-6">
              <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
                {/* Image Gallery */}
                <ProductImageGallery images={product.images} title={product.title} discount={product.discount} />

                {/* Product Info */}
                <div>
                  <h1 className="text-lg font-medium text-gray-900 leading-snug lg:text-xl">
                    {product.title}
                  </h1>

                  {/* Rating bar */}
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-orange-500">{product.rating.toFixed(1)}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14}
                            className={s <= Math.round(product.rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">{product.reviewCount.toLocaleString("pt-BR")} Avaliações</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">{soldText} Vendidos</span>
                  </div>

                  {/* Price section */}
                  <div className="mt-4 rounded-lg bg-orange-50 px-4 py-3">
                    {product.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.discount && (
                        <span className="rounded bg-orange-600 px-1.5 py-0.5 text-xs font-bold text-white">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      em até 12x de {formatPrice(product.price / 12)} sem juros
                    </p>
                  </div>

                  {/* Shipping */}
                  <div className="mt-4 flex items-center gap-6 text-sm">
                    <span className="text-gray-500">Frete</span>
                    {product.freeShipping ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <Truck size={16} />
                        <span>Frete Grátis</span>
                      </div>
                    ) : (
                      <span className="text-gray-700">Consultar no site</span>
                    )}
                  </div>

                  {/* Seller */}
                  <div className="mt-3 flex items-center gap-6 text-sm">
                    <span className="text-gray-500">Loja</span>
                    <span className="font-medium text-gray-800">{product.seller}</span>
                  </div>

                  {/* Source */}
                  <div className="mt-3 flex items-center gap-6 text-sm">
                    <span className="text-gray-500">Disponível em</span>
                    <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                      {sourceLabels[product.source]}
                    </span>
                  </div>

                  {/* CTA */}
                  <AffiliateButton
                    href={affiliateLink}
                    sourceLabel={sourceLabels[product.source]}
                    productId={product.id}
                    productTitle={product.title}
                    productCategory={product.category}
                    productSource={product.source}
                    productPrice={product.price}
                  />

                  <p className="mt-2 text-center text-xs text-gray-400">
                    Você será redirecionado para o {sourceLabels[product.source]}
                  </p>

                  {/* Trust badges */}
                  <div className="mt-4 flex items-center justify-center gap-6 rounded-lg border border-gray-100 py-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield size={14} className="text-orange-500" />
                      Compra segura
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} className="text-orange-500" />
                      Site verificado
                    </div>
                  </div>

                  {/* Features */}
                  {product.features.length > 0 && (
                    <div className="mt-5">
                      <h3 className="mb-2 text-sm font-semibold text-gray-700">Características</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {product.features.map((feature, i) => (
                          <span key={i} className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm lg:p-6">
              <h2 className="mb-3 text-base font-bold text-gray-900">Descrição do Produto</h2>
              <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
            </div>

            {/* Ad */}
            <div className="mt-4">
              <AdBanner />
            </div>
          </div>

          {/* Right sidebar + related: shuffled client component */}
          <ShuffledRecommendations productId={product.id} categorySlug={product.categorySlug} />
        </div>
      </div>
    </div>
  );
}
