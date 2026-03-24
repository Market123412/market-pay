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

export function getAffiliateUrl(baseUrl: string, productId: string, title?: string): string {
  // Shopee datafeed links (shope.ee/an_redir) — already have affiliate tracking
  if (baseUrl.includes("shope.ee/")) {
    return baseUrl;
  }

  // If the URL is just a store homepage/search, build a proper search link using the title
  const isGenericUrl =
    baseUrl === "https://mercadolivre.com.br" ||
    baseUrl === "https://amazon.com.br" ||
    baseUrl === "https://shopee.com.br" ||
    baseUrl.match(/^https?:\/\/[^/]+\/?$/);

  if (isGenericUrl && title) {
    const q = encodeURIComponent(title);
    if (baseUrl.includes("mercadolivre")) {
      return `https://lista.mercadolivre.com.br/${q.replace(/%20/g, "-")}?matt_tool=35864491&matt_word=marcelwillianreissales`;
    }
    if (baseUrl.includes("amazon")) {
      return `https://www.amazon.com.br/s?k=${q}&tag=marketpaycomm-20`;
    }
    if (baseUrl.includes("shopee")) {
      return `https://shope.ee/an_redir?origin_link=${encodeURIComponent(`https://shopee.com.br/search?keyword=${q}`)}`;
    }
  }

  // URLs with actual product paths — append ref
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}ref=marketpay-${productId}`;
}
