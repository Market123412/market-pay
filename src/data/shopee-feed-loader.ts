import type { Product } from "./products";
import shopeeRaw from "./shopee-products.json";

interface ShopeeRawProduct {
  itemid: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  likes: number;
  image: string;
  image2?: string;
  shopName: string;
  categorySlug: string;
  category: string;
  affiliateUrl: string;
  productLink?: string;
}

const raw = shopeeRaw as ShopeeRawProduct[];

// Deterministic pseudo-random from seed
function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export function loadShopeeProducts(startId: number): Product[] {
  return raw.map((item, i) => {
    const seed = parseInt(item.itemid.slice(-6)) || i;
    return {
      id: `shp-${item.itemid}`,
      title: item.title,
      description: `${item.title} - Vendido por ${item.shopName} na Shopee`,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: item.discount,
      image: item.image,
      images: item.image2 ? [item.image, item.image2] : [item.image],
      category: item.category,
      categorySlug: item.categorySlug,
      source: "shopee" as const,
      affiliateUrl: item.affiliateUrl,
      rating: item.rating ?? 4.5,
      reviewCount: Math.max(item.likes, Math.floor(seeded(seed) * 500) + 10),
      reviews: [],
      freeShipping: seeded(seed + 1) > 0.3,
      seller: item.shopName,
      features: [],
    };
  });
}
