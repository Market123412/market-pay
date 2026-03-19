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
  condition: string;
}

const raw = shopeeRaw as ShopeeRawProduct[];

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max) + "…";
}

export function loadShopeeProducts(startId: number): Product[] {
  return raw.map((item, i) => ({
    id: `shp-${item.itemid}`,
    title: truncate(item.title, 120),
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
    reviewCount: Math.max(item.likes, Math.floor(Math.random() * 200) + 10),
    reviews: [],
    freeShipping: Math.random() > 0.3,
    seller: item.shopName,
    features: [],
  }));
}
