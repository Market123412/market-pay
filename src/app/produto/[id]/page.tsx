import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { sourceLabels, sourceColors, formatPrice, getAffiliateUrl } from "@/lib/affiliate";
import StarRating from "@/components/StarRating";
import AdBanner from "@/components/AdBanner";
import ProductCard from "@/components/ProductCard";
import {
  ChevronRight,
  ExternalLink,
  Truck,
  Shield,
  Star,
  ThumbsUp,
  Share2,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allProducts.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const affiliateLink = getAffiliateUrl(product.affiliateUrl, product.id, product.title);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Início</Link>
        <ChevronRight size={14} />
        <Link href={`/categoria/${product.categorySlug}`} className="hover:text-emerald-600">
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="line-clamp-1 font-medium text-gray-900">{product.title}</span>
      </nav>

      {/* Product main section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border border-gray-200">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.discount && (
              <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
                -{product.discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-xl border-2 border-gray-200 bg-white cursor-pointer hover:border-emerald-500 transition-colors"
                >
                  <Image src={img} alt={`${product.title} ${i + 1}`} fill className="object-cover" sizes="100px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Source badge */}
          <div className="mb-3 flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${sourceColors[product.source]}`}>
              {sourceLabels[product.source]}
            </span>
            <span className="text-sm text-gray-500">Vendido por <strong>{product.seller}</strong></span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">{product.title}</h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-4">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size={20} />
            <button className="text-sm text-emerald-600 hover:underline">
              Ver avaliações
            </button>
          </div>

          {/* Price */}
          <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-6">
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-extrabold text-gray-900">{formatPrice(product.price)}</p>
              {product.discount && (
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-bold text-red-600">
                  -{product.discount}%
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-emerald-600 font-medium">
              em até 12x de {formatPrice(product.price / 12)} sem juros
            </p>

            {product.freeShipping && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-emerald-700">
                <Truck size={18} />
                <span className="text-sm font-semibold">Frete Grátis para todo o Brasil</span>
              </div>
            )}

            {/* CTA */}
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-4 text-lg font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-lg"
            >
              <ExternalLink size={20} />
              Comprar no {sourceLabels[product.source]}
            </a>

            <p className="mt-3 text-center text-xs text-gray-400">
              Você será redirecionado para o site oficial do {sourceLabels[product.source]}
            </p>

            {/* Trust badges */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-emerald-600" />
                Compra segura
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp size={14} className="text-emerald-600" />
                Site verificado
              </div>
            </div>
          </div>

          {/* Share */}
          <button className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600">
            <Share2 size={16} />
            Compartilhar este produto
          </button>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Características
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <section className="mt-12 rounded-2xl bg-white border border-gray-200 p-6 lg:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Descrição do Produto</h2>
        <p className="leading-relaxed text-gray-600">{product.description}</p>
      </section>

      {/* Ad */}
      <div className="mt-8">
        <AdBanner />
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Avaliações ({product.reviewCount.toLocaleString("pt-BR")})
        </h2>
        <div className="space-y-4">
          {product.reviews.map((review, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className={s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-gray-400">
          Avaliações importadas do {sourceLabels[product.source]}
        </p>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
