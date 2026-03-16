import axios from "axios";
import CryptoJS from "crypto-js";

const AMAZON_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY || "";
const AMAZON_SECRET_KEY = process.env.AMAZON_SECRET_KEY || "";
const AMAZON_PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "";
const AMAZON_HOST = "webservices.amazon.com.br";
const AMAZON_REGION = process.env.AMAZON_REGION || "us-east-1";

function getAmzDate(date: Date): string {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function getDateStamp(date: Date): string {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

function sign(key: CryptoJS.lib.WordArray, msg: string): CryptoJS.lib.WordArray {
  return CryptoJS.HmacSHA256(msg, key);
}

function getSignatureKey(key: string, dateStamp: string, region: string, service: string) {
  const kDate = sign(CryptoJS.enc.Utf8.parse("AWS4" + key), dateStamp);
  const kRegion = sign(kDate, region);
  const kService = sign(kRegion, service);
  const kSigning = sign(kService, "aws4_request");
  return kSigning;
}

export interface AmazonProduct {
  asin: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  rating?: number;
  reviewCount?: number;
  features: string[];
}

export async function searchAmazonProducts(
  keywords: string,
  category?: string,
  maxResults: number = 10
): Promise<AmazonProduct[]> {
  if (!AMAZON_ACCESS_KEY || !AMAZON_SECRET_KEY || !AMAZON_PARTNER_TAG) {
    console.warn("[Amazon API] Chaves não configuradas. Usando dados mock.");
    return [];
  }

  const now = new Date();
  const amzDate = getAmzDate(now);
  const dateStamp = getDateStamp(now);

  const payload = JSON.stringify({
    Keywords: keywords,
    Resources: [
      "Images.Primary.Large",
      "ItemInfo.Title",
      "ItemInfo.Features",
      "Offers.Listings.Price",
      "Offers.Listings.SavingBasis",
      "CustomerReviews.StarRating",
      "CustomerReviews.Count",
    ],
    PartnerTag: AMAZON_PARTNER_TAG,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com.br",
    ...(category ? { SearchIndex: category } : {}),
    ItemCount: maxResults,
  });

  const path = "/paapi5/searchitems";
  const service = "ProductAdvertisingAPI";
  const contentType = "application/json; charset=UTF-8";
  const target = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";

  const canonicalHeaders =
    `content-encoding:amz-1.0\ncontent-type:${contentType}\nhost:${AMAZON_HOST}\nx-amz-date:${amzDate}\nx-amz-target:${target}\n`;
  const signedHeaders = "content-encoding;content-type;host;x-amz-date;x-amz-target";

  const payloadHash = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
  const canonicalRequest = `POST\n${path}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const credentialScope = `${dateStamp}/${AMAZON_REGION}/${service}/aws4_request`;
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${CryptoJS.SHA256(canonicalRequest).toString(CryptoJS.enc.Hex)}`;

  const signingKey = getSignatureKey(AMAZON_SECRET_KEY, dateStamp, AMAZON_REGION, service);
  const signature = CryptoJS.HmacSHA256(stringToSign, signingKey).toString(CryptoJS.enc.Hex);

  const authHeader = `AWS4-HMAC-SHA256 Credential=${AMAZON_ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  try {
    const response = await axios.post(`https://${AMAZON_HOST}${path}`, payload, {
      headers: {
        "content-encoding": "amz-1.0",
        "content-type": contentType,
        host: AMAZON_HOST,
        "x-amz-date": amzDate,
        "x-amz-target": target,
        Authorization: authHeader,
      },
      timeout: 10000,
    });

    const items = response.data?.SearchResult?.Items || [];

    return items.map((item: Record<string, unknown>) => {
      const itemInfo = item.ItemInfo as Record<string, unknown> | undefined;
      const title = itemInfo?.Title as Record<string, unknown> | undefined;
      const features = itemInfo?.Features as Record<string, unknown> | undefined;
      const offers = item.Offers as Record<string, unknown> | undefined;
      const listings = (offers?.Listings as Array<Record<string, unknown>>) || [];
      const listing = listings[0] || {};
      const price = listing.Price as Record<string, unknown> | undefined;
      const savingBasis = listing.SavingBasis as Record<string, unknown> | undefined;
      const images = item.Images as Record<string, unknown> | undefined;
      const primary = images?.Primary as Record<string, unknown> | undefined;
      const large = primary?.Large as Record<string, unknown> | undefined;
      const reviews = item.CustomerReviews as Record<string, unknown> | undefined;

      return {
        asin: item.ASIN as string,
        title: (title?.DisplayValue as string) || "Sem título",
        price: (price?.Amount as number) || 0,
        originalPrice: (savingBasis?.Amount as number) || undefined,
        image: (large?.URL as string) || "",
        url: (item.DetailPageURL as string) || "",
        rating: (reviews?.StarRating as Record<string, unknown>)?.Value as number | undefined,
        reviewCount: (reviews?.Count as number) || undefined,
        features: ((features?.DisplayValues as string[]) || []).slice(0, 5),
      };
    });
  } catch (error) {
    console.error("[Amazon API] Erro ao buscar produtos:", error);
    return [];
  }
}
