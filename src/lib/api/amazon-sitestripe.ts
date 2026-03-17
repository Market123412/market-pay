/**
 * Amazon SiteStripe - Gera links de afiliado sem precisar da PA API.
 * A PA API exige 10 vendas qualificadas nos últimos 30 dias.
 * Enquanto não temos acesso, usamos links diretos com o tag de associado.
 */

const AMAZON_PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || "";

export function getAmazonAffiliateUrl(productUrl: string): string {
  if (!AMAZON_PARTNER_TAG) return productUrl;

  const url = new URL(productUrl);
  url.searchParams.set("tag", AMAZON_PARTNER_TAG);
  return url.toString();
}

export function getAmazonProductUrl(asin: string): string {
  const base = `https://www.amazon.com.br/dp/${asin}`;
  if (!AMAZON_PARTNER_TAG) return base;
  return `${base}?tag=${AMAZON_PARTNER_TAG}`;
}

export function getAmazonSearchUrl(query: string): string {
  const base = `https://www.amazon.com.br/s`;
  const url = new URL(base);
  url.searchParams.set("k", query);
  if (AMAZON_PARTNER_TAG) {
    url.searchParams.set("tag", AMAZON_PARTNER_TAG);
  }
  return url.toString();
}

export function getAmazonPrimeUrl(): string {
  if (!AMAZON_PARTNER_TAG) return "https://www.amazon.com.br/prime";
  return `https://www.amazon.com.br/prime?tag=${AMAZON_PARTNER_TAG}`;
}

export function getKindleUnlimitedUrl(): string {
  if (!AMAZON_PARTNER_TAG) return "https://www.amazon.com.br/kindleunlimited";
  return `https://www.amazon.com.br/kindleunlimited?tag=${AMAZON_PARTNER_TAG}`;
}

export function getAmazonMusicUrl(): string {
  if (!AMAZON_PARTNER_TAG) return "https://www.amazon.com.br/music/unlimited";
  return `https://www.amazon.com.br/music/unlimited?tag=${AMAZON_PARTNER_TAG}`;
}

/** Produtos populares da Amazon com ASINs reais para usar com SiteStripe */
export const popularAmazonProducts = [
  {
    asin: "B0D77HRG2S",
    title: "Echo Dot 5ª Geração Smart Speaker com Alexa",
    category: "Eletrônicos",
  },
  {
    asin: "B0BTML25Y4",
    title: "Kindle 11ª Geração",
    category: "Eletrônicos",
  },
  {
    asin: "B09V3KXJPB",
    title: "Fire TV Stick",
    category: "Eletrônicos",
  },
];
