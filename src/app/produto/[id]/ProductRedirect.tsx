"use client";

import { useEffect } from "react";
import { trackAffiliateClick } from "@/lib/tracking";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface ProductRedirectProps {
  affiliateUrl: string;
  productId: string;
  productTitle: string;
  productCategory: string;
  productSource: string;
  productPrice: number;
  sourceLabel: string;
}

export default function ProductRedirect({
  affiliateUrl,
  productId,
  productTitle,
  productCategory,
  productSource,
  productPrice,
  sourceLabel,
}: ProductRedirectProps) {
  useEffect(() => {
    // Fire Meta Pixel ViewContent event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: productTitle,
        content_category: productCategory,
        content_ids: [productId],
        content_type: "product",
        value: productPrice,
        currency: "BRL",
      });
    }

    // Track affiliate click
    trackAffiliateClick({
      id: productId,
      title: productTitle,
      category: productCategory,
      source: productSource,
      price: productPrice,
      affiliateUrl,
    });

    // Redirect after a brief delay (allows tracking to fire)
    const timer = setTimeout(() => {
      window.location.href = affiliateUrl;
    }, 1500);

    return () => clearTimeout(timer);
  }, [affiliateUrl, productId, productTitle, productCategory, productSource, productPrice]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 size={40} className="mx-auto mb-4 animate-spin text-orange-500" />
        <h1 className="text-lg font-semibold text-gray-800">Redirecionando...</h1>
        <p className="mt-1 text-sm text-gray-500">
          Levando você para o <span className="font-medium text-orange-600">{sourceLabel}</span>
        </p>
        <a
          href={affiliateUrl}
          className="mt-4 inline-block text-xs text-orange-500 underline hover:text-orange-600"
        >
          Clique aqui se não for redirecionado
        </a>
      </div>
    </div>
  );
}
