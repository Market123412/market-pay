"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/affiliate";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const soldCount = product.reviewCount > 1000
    ? `${(product.reviewCount / 1000).toFixed(0)}mil+`
    : product.reviewCount > 0
    ? `${product.reviewCount}`
    : null;

  return (
    <Link
      href={`/produto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2 transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
