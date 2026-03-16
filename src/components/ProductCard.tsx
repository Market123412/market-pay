"use client";

import Link from "next/link";
import Image from "next/image";
import { Truck, ExternalLink } from "lucide-react";
import { Product } from "@/data/products";
import { sourceLabels, sourceColors, formatPrice } from "@/lib/affiliate";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.discount && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
            -{product.discount}%
          </span>
        )}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${sourceColors[product.source]}`}
        >
          {sourceLabels[product.source]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-emerald-700">
          {product.title}
        </h3>

        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size={14} />
        </div>

        <div className="mt-auto pt-3">
          {product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
          <p className="text-xs text-emerald-600 font-medium">
            ou 12x de {formatPrice(product.price / 12)}
          </p>
        </div>

        {product.freeShipping && (
          <div className="mt-2 flex items-center gap-1 text-emerald-600">
            <Truck size={14} />
            <span className="text-xs font-semibold">Frete Grátis</span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-emerald-700">
          <ExternalLink size={14} />
          Ver Oferta
        </div>
      </div>
    </Link>
  );
}
