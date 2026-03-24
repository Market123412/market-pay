"use client";

import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/tracking";

interface AffiliateButtonProps {
  href: string;
  sourceLabel: string;
  productId: string;
  productTitle: string;
  productCategory: string;
  productSource: string;
  productPrice: number;
}

export default function AffiliateButton({
  href,
  sourceLabel,
  productId,
  productTitle,
  productCategory,
  productSource,
  productPrice,
}: AffiliateButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackAffiliateClick({
          id: productId,
          title: productTitle,
          category: productCategory,
          source: productSource,
          price: productPrice,
          affiliateUrl: href,
        })
      }
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg"
    >
      <ExternalLink size={18} />
      Comprar no {sourceLabel}
    </a>
  );
}
