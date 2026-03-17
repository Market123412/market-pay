import { searchAmazonProducts } from "./amazon";
import { searchMercadoLivreProducts } from "./mercadolivre";
import { searchShopeeProducts } from "./shopee";
import { allProducts as mockProducts, Product } from "@/data/products";
import { AffiliateSource } from "@/data/products";

export interface UnifiedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  url: string;
  source: AffiliateSource;
  rating?: number;
  reviewCount?: number;
  freeShipping: boolean;
  seller: string;
  features: string[];
}

function calculateDiscount(original?: number, current?: number): number | undefined {
  if (!original || !current || original <= current) return undefined;
  return Math.round(((original - current) / original) * 100);
}

export async function searchAllProducts(query: string, limit: number = 10): Promise<UnifiedProduct[]> {
  const [amazonResults, mlResults, shopeeResults] = await Promise.allSettled([
    searchAmazonProducts(query, undefined, limit),
    searchMercadoLivreProducts(query, undefined, limit),
    searchShopeeProducts(query, limit),
  ]);

  const unified: UnifiedProduct[] = [];

  // Amazon products
  if (amazonResults.status === "fulfilled") {
    for (const p of amazonResults.value) {
      unified.push({
        id: `amz-${p.asin}`,
        title: p.title,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: calculateDiscount(p.originalPrice, p.price),
        image: p.image,
        images: [p.image],
        url: p.url,
        source: "amazon",
        rating: p.rating,
        reviewCount: p.reviewCount,
        freeShipping: false,
        seller: "Amazon",
        features: p.features,
      });
    }
  }

  // Mercado Livre products
  if (mlResults.status === "fulfilled") {
    for (const p of mlResults.value) {
      unified.push({
        id: `ml-${p.id}`,
        title: p.title,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: calculateDiscount(p.originalPrice, p.price),
        image: p.image,
        images: p.images.length > 0 ? p.images : [p.image],
        url: p.url,
        source: "mercadolivre",
        rating: p.rating,
        reviewCount: p.reviewCount,
        freeShipping: p.freeShipping,
        seller: p.seller,
        features: p.features,
      });
    }
  }

  // Shopee products
  if (shopeeResults.status === "fulfilled") {
    for (const p of shopeeResults.value) {
      unified.push({
        id: `shp-${p.itemId}`,
        title: p.title,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: calculateDiscount(p.originalPrice, p.price),
        image: p.image,
        images: [p.image],
        url: p.url,
        source: "shopee",
        rating: p.rating,
        reviewCount: undefined,
        freeShipping: p.freeShipping,
        seller: p.shopName,
        features: [],
      });
    }
  }

  // If no API results, fallback to mock data
  if (unified.length === 0) {
    return mockProducts
      .filter(
        (p) =>
          !query ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit)
      .map(productToUnified);
  }

  return unified;
}

export function productToUnified(p: Product): UnifiedProduct {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    image: p.image,
    images: p.images,
    url: p.affiliateUrl,
    source: p.source,
    rating: p.rating,
    reviewCount: p.reviewCount,
    freeShipping: p.freeShipping,
    seller: p.seller,
    features: p.features,
  };
}
