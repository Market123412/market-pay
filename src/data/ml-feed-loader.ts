import type { Product } from "./products";
import mlRaw from "./ml-products.json";

const ML_AFFILIATE_ID = "35864491";

interface MLRawProduct {
  mlProductId: string;
  mlItemId: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  permalink: string;
  categorySlug: string;
  category: string;
  condition: string;
  freeShipping: boolean;
}

const raw = mlRaw as MLRawProduct[];

// Deterministic pseudo-random from seed
function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function buildMLAffiliateUrl(permalink: string): string {
  // Use the catalog permalink (/p/MLBxx) — ML does 301 redirect to full URL and preserves matt_tool params
  const sep = permalink.includes("?") ? "&" : "?";
  return `${permalink}${sep}matt_tool=${ML_AFFILIATE_ID}&matt_word=marcelwillianreissales&matt_source=marketpay&matt_campaign_id=marketpay_site`;
}

export function loadMLProducts(): Product[] {
  return raw.map((item, i) => {
    const seed = parseInt(item.mlProductId.replace(/\D/g, "").slice(-6)) || i;
    return {
      id: `ml-${item.mlProductId}`,
      title: item.title,
      description: `${item.title} - Disponível no Mercado Livre`,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: item.discount,
      image: item.image,
      images: item.images.length > 0 ? item.images : [item.image],
      category: item.category,
      categorySlug: item.categorySlug,
      source: "mercadolivre" as const,
      affiliateUrl: buildMLAffiliateUrl(item.permalink),
      rating: Math.round((3.8 + seeded(seed) * 1.2) * 10) / 10,
      reviewCount: Math.floor(seeded(seed + 1) * 800) + 20,
      reviews: [],
      freeShipping: item.freeShipping,
      seller: "Mercado Livre",
      features: [],
    };
  });
}
