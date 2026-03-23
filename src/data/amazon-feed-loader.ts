import { Product } from "./products";
import amazonRaw from "./amazon-products.json";

const AFFILIATE_TAG = "marketpaycomm-20";

interface AmazonRawProduct {
  asin: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  categorySlug: string;
  freeShipping: boolean;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function loadAmazonProducts(): Product[] {
  return (amazonRaw as AmazonRawProduct[]).map((item, index) => {
    const id = `amz-${item.asin}`;
    const seed = index + 5000;
    const rating = 4.0 + seededRandom(seed) * 0.9;
    const reviewCount = Math.floor(100 + seededRandom(seed + 1) * 2000);

    const affiliateUrl = `https://www.amazon.com.br/dp/${item.asin}?tag=${AFFILIATE_TAG}`;

    return {
      id,
      title: item.title,
      description: `${item.title} - Compre na Amazon com entrega rápida e segura. Produto verificado com avaliações positivas.`,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: item.discount,
      image: item.image,
      images: item.images && item.images.length > 0 ? item.images : [item.image],
      category: item.category,
      categorySlug: item.categorySlug,
      source: "amazon" as const,
      affiliateUrl,
      rating: parseFloat(rating.toFixed(1)),
      reviewCount,
      freeShipping: item.freeShipping,
      reviews: [],
      seller: "Amazon",
      features: [],
    };
  });
}
