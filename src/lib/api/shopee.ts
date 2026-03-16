import axios from "axios";
import CryptoJS from "crypto-js";

const SHOPEE_PARTNER_ID = process.env.SHOPEE_PARTNER_ID || "";
const SHOPEE_PARTNER_KEY = process.env.SHOPEE_PARTNER_KEY || "";
const SHOPEE_AFFILIATE_ID = process.env.SHOPEE_AFFILIATE_ID || "";
const SHOPEE_BASE_URL = "https://open-api.affiliate.shopee.com.br";

function generateSignature(path: string, timestamp: number): string {
  const baseString = `${SHOPEE_PARTNER_ID}${path}${timestamp}`;
  return CryptoJS.HmacSHA256(baseString, SHOPEE_PARTNER_KEY).toString(CryptoJS.enc.Hex);
}

export interface ShopeeProduct {
  itemId: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  rating?: number;
  sales: number;
  shopName: string;
  freeShipping: boolean;
}

export async function searchShopeeProducts(
  keyword: string,
  limit: number = 10
): Promise<ShopeeProduct[]> {
  if (!SHOPEE_PARTNER_ID || !SHOPEE_PARTNER_KEY) {
    console.warn("[Shopee API] Chaves não configuradas. Usando dados mock.");
    return [];
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const path = "/graphql";
  const signature = generateSignature(path, timestamp);

  const query = `
    query {
      productOfferV2(
        keyword: "${keyword}"
        limit: ${limit}
        sortType: 2
      ) {
        nodes {
          productName
          itemId
          commissionRate
          commission
          price
          originalPrice
          sales
          imageUrl
          productLink
          shopName
          ratingStar
          priceDiscount
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      SHOPEE_BASE_URL + path,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `SHA256 Credential=${SHOPEE_PARTNER_ID}, Timestamp=${timestamp}, Signature=${signature}`,
        },
        timeout: 10000,
      }
    );

    const nodes = response.data?.data?.productOfferV2?.nodes || [];

    return nodes.map((item: Record<string, unknown>) => ({
      itemId: String(item.itemId),
      title: (item.productName as string) || "",
      price: ((item.price as number) || 0) / 100000,
      originalPrice: item.originalPrice ? ((item.originalPrice as number) / 100000) : undefined,
      image: (item.imageUrl as string) || "",
      url: (item.productLink as string) || "",
      rating: (item.ratingStar as number) || undefined,
      sales: (item.sales as number) || 0,
      shopName: (item.shopName as string) || "Loja Shopee",
      freeShipping: false,
    }));
  } catch (error) {
    console.error("[Shopee API] Erro ao buscar produtos:", error);
    return [];
  }
}
