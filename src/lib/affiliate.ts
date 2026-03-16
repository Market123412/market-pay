import { AffiliateSource } from "@/data/products";

export const sourceLabels: Record<AffiliateSource, string> = {
  mercadolivre: "Mercado Livre",
  amazon: "Amazon",
  shopee: "Shopee",
};

export const sourceColors: Record<AffiliateSource, string> = {
  mercadolivre: "bg-yellow-400 text-yellow-900",
  amazon: "bg-orange-500 text-white",
  shopee: "bg-red-500 text-white",
};

export const sourceBorderColors: Record<AffiliateSource, string> = {
  mercadolivre: "border-yellow-400",
  amazon: "border-orange-500",
  shopee: "border-red-500",
};

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getAffiliateUrl(baseUrl: string, productId: string): string {
  // In production, append your affiliate tag/ID here
  // Example: `${baseUrl}?tag=YOUR_AFFILIATE_ID&ref=mp-${productId}`
  return `${baseUrl}?ref=marketpay-${productId}`;
}
