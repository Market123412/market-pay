"use client";

import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/affiliate";
import { trackProductClick, trackAffiliateClick } from "@/lib/tracking";
import { getAffiliateUrl } from "@/lib/affiliate";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const soldCount = product.reviewCount > 1000
    ? `${(product.reviewCount / 1000).toFixed(0)}mil+`
    : product.reviewCount > 0
    ? `${product.reviewCount}`
    : null;

  const isAmazon = product.source === "amazon";

  // Amazon → direct link to affiliate (no product page — images are unreliable without PA-API)
  if (isAmazon) {
    const affiliateUrl = getAffiliateUrl(product.affiliateUrl, product.id, product.title);
    return (
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackProductClick({ id: product.id, title: product.title, category: product.category, source: product.source, price: product.price });
          trackAffiliateClick({ id: product.id, title: product.title, category: product.category, source: product.source, price: product.price, affiliateUrl: affiliateUrl });
        }}
        className="group flex flex-col overflow-hidden rounded-lg border border-orange-200 bg-white transition-all hover:shadow-md hover:border-orange-400"
      >
        {/* Amazon branded header */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
          <div className="mb-2 rounded-md bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1">
            <ExternalLink size={10} />
            Ver na Amazon
          </div>
          <h3 className="text-center text-xs leading-4 text-gray-700 line-clamp-4 font-medium px-1">
            {product.title}
          </h3>
          {product.discount && product.discount >= 10 && (
            <span className="absolute right-0 top-2 rounded-l-sm bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              -{product.discount}%
            </span>
          )}
          {product.freeShipping && (
            <span className="absolute bottom-0 left-0 right-0 bg-emerald-500 py-0.5 text-center text-[10px] font-semibold text-white">
              Frete Grátis
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-2 pb-2 pt-1.5 border-t border-orange-100">
          <div className="mt-auto pt-1">
            {product.originalPrice && (
              <p className="text-[10px] text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-base font-bold text-orange-600">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
            <span className="font-semibold text-orange-500">Amazon</span>
            {soldCount && <span>{soldCount} vendidos</span>}
          </div>
        </div>
      </a>
    );
  }

  // ML / Shopee → product detail page (images are real from API)
  return (
    <Link
      href={`/produto/${product.id}`}
      onClick={() => trackProductClick({ id: product.id, title: product.title, category: product.category, source: product.source, price: product.price })}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-2 transition-transform group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = '/placeholder-product.svg'; }}
          onLoad={(e) => { if (e.currentTarget.naturalWidth <= 2) e.currentTarget.src = '/placeholder-product.svg'; }}
        />
        {product.discount && product.discount >= 10 && (
          <span className="absolute right-0 top-2 rounded-l-sm bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            -{product.discount}%
          </span>
        )}
        {product.freeShipping && (
          <span className="absolute bottom-0 left-0 right-0 bg-emerald-500 py-0.5 text-center text-[10px] font-semibold text-white">
            Frete Grátis
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-1.5">
        <h3 className="line-clamp-2 text-xs leading-4 text-gray-700 group-hover:text-orange-600">
          {product.title}
        </h3>

        <div className="mt-auto pt-2">
          {product.originalPrice && (
            <p className="text-[10px] text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-base font-bold text-orange-600">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex items-center gap-0.5">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          {soldCount && <span>{soldCount} vendidos</span>}
        </div>

        <span className="mt-1 text-[10px] text-gray-400 truncate">
          {product.seller}
        </span>
      </div>
    </Link>
  );
}
