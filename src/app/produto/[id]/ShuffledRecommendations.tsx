"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { allProducts } from "@/data/products";
import { formatPrice } from "@/lib/affiliate";
import { shuffle } from "@/lib/shuffle";

function SidebarCard({ product }: { product: typeof allProducts[0] }) {
  return (
    <Link
      href={`/produto/${product.id}`}
      className="group flex gap-2 rounded-lg border border-gray-100 bg-white p-2 transition-shadow hover:shadow-sm"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-1"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="line-clamp-2 text-[11px] leading-tight text-gray-700 group-hover:text-orange-600">
          {product.title}
        </p>
        <p className="mt-1 text-xs font-bold text-orange-600">{formatPrice(product.price)}</p>
        {product.discount && product.discount >= 10 && (
          <span className="text-[9px] text-red-500 font-semibold">-{product.discount}%</span>
        )}
      </div>
    </Link>
  );
}

interface Props {
  productId: string;
  categorySlug: string;
}

export default function ShuffledRecommendations({ productId, categorySlug }: Props) {
  const [sidebar, setSidebar] = useState<typeof allProducts>([]);

  useEffect(() => {
    const sameCategory = shuffle(
      allProducts.filter((p) => p.id !== productId && p.categorySlug === categorySlug)
    );
    const otherCategory = shuffle(
      allProducts.filter((p) => p.id !== productId && p.categorySlug !== categorySlug)
    );

    // 5 same category + 3 other = 8 sidebar products
    setSidebar([...sameCategory.slice(0, 5), ...otherCategory.slice(0, 3)]);
  }, [productId, categorySlug]);

  if (sidebar.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-4 rounded-lg bg-white p-3 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
          Você também pode gostar
        </h3>
        <div className="flex flex-col gap-2">
          {sidebar.map((p) => (
            <SidebarCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </aside>
  );
}
