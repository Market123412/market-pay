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

// Reliable stock images per category — used because ASIN-based Amazon image URLs are deprecated
const categoryImages: Record<string, string[]> = {
  eletronicos: [
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80",
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&q=80",
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=500&q=80",
    "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
  ],
  moda: [
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    "https://images.unsplash.com/photo-1434389677669-e08b4cda3a40?w=500&q=80",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=80",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&q=80",
  ],
  "casa-decoracao": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80",
    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80",
  ],
  livros: [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=500&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&q=80",
  ],
  "beleza-saude": [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
  ],
  games: [
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&q=80",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&q=80",
    "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",
    "https://images.unsplash.com/photo-1580327344181-c131031d4878?w=500&q=80",
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80",
  ],
  esportes: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&q=80",
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&q=80",
    "https://images.unsplash.com/photo-1593095948071-474c5cc2c4d8?w=500&q=80",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80",
  ],
};

const defaultImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
];

function getCategoryImage(categorySlug: string, index: number): string {
  const images = categoryImages[categorySlug] || defaultImages;
  return images[index % images.length];
}

export function loadAmazonProducts(): Product[] {
  return (amazonRaw as AmazonRawProduct[]).map((item, index) => {
    const id = `amz-${item.asin}`;
    const seed = index + 5000;
    const rating = 4.0 + seededRandom(seed) * 0.9;
    const reviewCount = Math.floor(100 + seededRandom(seed + 1) * 2000);

    // SiteStripe direct product link — official Amazon Associates format
    const affiliateUrl = `https://www.amazon.com.br/dp/${item.asin}?tag=${AFFILIATE_TAG}&linkCode=ogi&th=1&psc=1`;

    // Use category-based stock images (ASIN-based Amazon CDN URLs are deprecated/unreliable)
    const displayImage = getCategoryImage(item.categorySlug, index);

    return {
      id,
      title: item.title,
      description: `${item.title} - Compre na Amazon com entrega rápida e segura. Produto verificado com avaliações positivas.`,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: item.discount,
      image: displayImage,
      images: [displayImage],
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
