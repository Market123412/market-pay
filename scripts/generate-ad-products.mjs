/**
 * Gera seleções de produtos otimizadas para anúncios em cada plataforma.
 * Uso: node scripts/generate-ad-products.mjs
 *
 * Output: docs/ad-products.json — lista de produtos por categoria com UTM links prontos
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SHOPEE_PATH = join(__dirname, "..", "src", "data", "shopee-products.json");
const ML_PATH = join(__dirname, "..", "src", "data", "ml-products.json");
const OUT_PATH = join(__dirname, "..", "docs", "ad-products.json");

const SITE_URL = "https://marketpaycommerce.com.br";

// ─── Load all products ───────────────────────────────
const shopee = JSON.parse(readFileSync(SHOPEE_PATH, "utf-8")).map((p) => ({
  id: `shp-${p.itemid}`,
  title: p.title,
  price: p.price,
  originalPrice: p.originalPrice,
  discount: p.discount || 0,
  image: p.image,
  category: p.category,
  categorySlug: p.categorySlug,
  source: "shopee",
  freeShipping: false,
  rating: p.rating || 4.5,
}));

const ml = JSON.parse(readFileSync(ML_PATH, "utf-8")).map((p) => ({
  id: `ml-${p.mlProductId}`,
  title: p.title,
  price: p.price,
  originalPrice: p.originalPrice,
  discount: p.discount || 0,
  image: p.image,
  category: p.category,
  categorySlug: p.categorySlug,
  source: "mercadolivre",
  freeShipping: p.freeShipping,
  rating: 4.3,
}));

const allProducts = [...shopee, ...ml];
console.log(`Total products: ${allProducts.length} (Shopee: ${shopee.length}, ML: ${ml.length})\n`);

// ─── Shuffle ─────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Category configs ────────────────────────────────
const CATEGORIES = [
  { slug: "eletronicos", name: "Eletrônicos", metaInterests: "Tecnologia, Smartphones, Gadgets", audience: "Homens 18-35", tiktok: true },
  { slug: "moda", name: "Moda", metaInterests: "Moda, Compras Online, Fast Fashion", audience: "Mulheres 18-40", tiktok: true },
  { slug: "casa-decoracao", name: "Casa & Decoração", metaInterests: "Decoração, Casa, Organização", audience: "Todos 25-45", tiktok: false },
  { slug: "beleza-saude", name: "Beleza & Saúde", metaInterests: "Skincare, Maquiagem, Perfumes", audience: "Mulheres 18-40", tiktok: true },
  { slug: "esportes", name: "Esportes", metaInterests: "Academia, Suplementos, Fitness", audience: "Todos 20-40", tiktok: true },
  { slug: "games", name: "Games", metaInterests: "PlayStation, Xbox, PC Gaming", audience: "Homens 16-30", tiktok: true },
  { slug: "livros", name: "Livros", metaInterests: "Livros, Leitura, Kindle", audience: "Todos 20-50", tiktok: false },
  { slug: "automotivo", name: "Automotivo", metaInterests: "Carros, Acessórios Automotivos", audience: "Homens 25-50", tiktok: false },
];

// ─── Platform configs ────────────────────────────────
const PLATFORMS = [
  { id: "meta", name: "Meta Ads (Facebook/Instagram)", productsPerAd: 5, format: "carrossel" },
  { id: "google", name: "Google Ads", productsPerAd: 1, format: "search" },
  { id: "tiktok", name: "TikTok Ads", productsPerAd: 1, format: "video" },
  { id: "pinterest", name: "Pinterest Ads", productsPerAd: 3, format: "pin" },
];

// ─── Generate ad selections ─────────────────────────
const adSets = [];
const date = new Date().toISOString().split("T")[0];

for (const cat of CATEGORIES) {
  const catProducts = allProducts.filter((p) => p.categorySlug === cat.slug);
  if (catProducts.length === 0) continue;

  // Prioritize products with discount > 15%
  const withDiscount = catProducts.filter((p) => p.discount >= 15);
  const pool = withDiscount.length >= 10 ? withDiscount : catProducts;
  const shuffled = shuffle(pool);

  for (const platform of PLATFORMS) {
    if (platform.id === "tiktok" && !cat.tiktok) continue;
    if (platform.id === "pinterest" && !["moda", "casa-decoracao", "beleza-saude"].includes(cat.slug)) continue;

    const selected = shuffled.slice(0, platform.productsPerAd);
    if (selected.length === 0) continue;

    const utmBase = `utm_source=${platform.id}&utm_medium=cpc&utm_campaign=${cat.slug}_${platform.format}&utm_content=${date}`;

    adSets.push({
      platform: platform.name,
      platformId: platform.id,
      format: platform.format,
      category: cat.name,
      categorySlug: cat.slug,
      audience: cat.audience,
      metaInterests: cat.metaInterests,
      productsPerAd: platform.productsPerAd,
      products: selected.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        discount: p.discount,
        image: p.image,
        source: p.source,
        productUrl: `${SITE_URL}/produto/${p.id}?${utmBase}&utm_term=${encodeURIComponent(p.id)}`,
      })),
      categoryUrl: `${SITE_URL}/categoria/${cat.slug}?${utmBase}`,
      suggestedCopy: generateCopy(cat, selected, platform),
    });
  }
}

function generateCopy(cat, products, platform) {
  const p = products[0];
  const priceText = p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (platform.id === "meta" && products.length > 1) {
    return {
      headline: `${cat.name} com até ${Math.max(...products.map((p) => p.discount || 0))}% OFF`,
      primaryText: `Comparamos preços no Mercado Livre, Amazon e Shopee. Confira as melhores ofertas de ${cat.name}!`,
      cta: "Ver Ofertas",
    };
  }
  if (platform.id === "google") {
    return {
      headline: `${p.title.substring(0, 30)} - ${priceText}`,
      description: `Melhor preço de ${cat.name}. Compare Mercado Livre, Shopee e Amazon. Frete grátis disponível.`,
      keywords: [
        `melhor preço ${cat.name.toLowerCase()}`,
        `${cat.name.toLowerCase()} barato`,
        `oferta ${cat.name.toLowerCase()}`,
        `comprar ${cat.name.toLowerCase()} online`,
      ],
    };
  }
  if (platform.id === "tiktok") {
    return {
      hook: `Achei ${cat.name.toLowerCase()} MUITO barato`,
      script: `"Olha esse ${p.title.substring(0, 40)} por apenas ${priceText}! Link na bio."`,
      hashtags: `#achadinhos #oferta #${cat.slug.replace("-", "")} #mercadolivre #shopee`,
    };
  }
  // Pinterest
  return {
    title: `${p.title.substring(0, 50)} - ${priceText}`,
    description: `Confira ofertas de ${cat.name}. Compare preços no Mercado Livre, Shopee e Amazon.`,
  };
}

// ─── Output ──────────────────────────────────────────
const output = {
  generatedAt: new Date().toISOString(),
  totalAdSets: adSets.length,
  summary: {
    byPlatform: {},
    byCategory: {},
  },
  adSets,
};

for (const ad of adSets) {
  output.summary.byPlatform[ad.platformId] = (output.summary.byPlatform[ad.platformId] || 0) + 1;
  output.summary.byCategory[ad.categorySlug] = (output.summary.byCategory[ad.categorySlug] || 0) + 1;
}

writeFileSync(OUT_PATH, JSON.stringify(output, null, 2), "utf-8");

console.log(`Generated ${adSets.length} ad sets:\n`);
console.log("By platform:");
Object.entries(output.summary.byPlatform).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
console.log("\nBy category:");
Object.entries(output.summary.byCategory).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
console.log(`\nSaved to ${OUT_PATH}`);

// ─── Print sample ad ─────────────────────────────────
console.log("\n─── Sample Meta Ad (Carrossel) ───");
const sample = adSets.find((a) => a.platformId === "meta");
if (sample) {
  console.log(`Category: ${sample.category}`);
  console.log(`Audience: ${sample.audience}`);
  console.log(`Interests: ${sample.metaInterests}`);
  console.log(`Copy: ${JSON.stringify(sample.suggestedCopy, null, 2)}`);
  console.log(`Products (${sample.products.length}):`);
  sample.products.forEach((p, i) =>
    console.log(`  ${i + 1}. ${p.title.substring(0, 50)}... — R$ ${p.price} (-${p.discount}%)`)
  );
}
