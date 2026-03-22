/**
 * Gera feed de catálogo de produtos para Meta Ads (Facebook/Instagram)
 * Formato CSV compatível com Meta Commerce Manager
 *
 * Uso: node scripts/generate-meta-catalog.mjs
 * Output: docs/meta-catalog.csv
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SHOPEE_PATH = join(__dirname, "..", "src", "data", "shopee-products.json");
const ML_PATH = join(__dirname, "..", "src", "data", "ml-products.json");
const OUT_CSV = join(__dirname, "..", "docs", "meta-catalog.csv");

const SITE_URL = "https://marketpaycommerce.com.br";

// ─── Load products ────────────────────────────────────
const shopee = JSON.parse(readFileSync(SHOPEE_PATH, "utf-8")).map((p) => ({
  id: `shp-${p.itemid}`,
  title: p.title,
  price: p.price,
  originalPrice: p.originalPrice,
  discount: p.discount || 0,
  image: p.image,
  category: p.category || "Geral",
  categorySlug: p.categorySlug || "geral",
  source: "Shopee",
  brand: p.shopName || "Shopee",
  freeShipping: false,
}));

const ml = JSON.parse(readFileSync(ML_PATH, "utf-8")).map((p) => ({
  id: `ml-${p.mlProductId}`,
  title: p.title,
  price: p.price,
  originalPrice: p.originalPrice,
  discount: p.discount || 0,
  image: p.image,
  category: p.category || "Geral",
  categorySlug: p.categorySlug || "geral",
  source: "Mercado Livre",
  brand: extractBrand(p.title),
  freeShipping: p.freeShipping,
}));

function extractBrand(title) {
  const knownBrands = [
    "Samsung", "Apple", "Xiaomi", "Sony", "LG", "Philips", "JBL", "Logitech",
    "Nike", "Adidas", "Puma", "Tramontina", "Omo", "Brastemp", "Electrolux",
    "Nintendo", "PlayStation", "Xbox", "Motorola", "Huawei", "Dell", "HP",
    "Lenovo", "Asus", "AOC", "Havaianas", "Boticário", "Natura", "Lola",
    "Multilaser", "Intelbras", "Mondial", "Cadence", "Britânia", "Arno",
  ];
  for (const brand of knownBrands) {
    if (title.toLowerCase().includes(brand.toLowerCase())) return brand;
  }
  return "Genérico";
}

const allProducts = [...shopee, ...ml];

// Remove duplicates by id
const seen = new Set();
const unique = allProducts.filter((p) => {
  if (seen.has(p.id)) return false;
  seen.add(p.id);
  return true;
});

// Filter: only products with images and valid prices
const valid = unique.filter((p) => p.image && p.price > 0 && p.title);

console.log(`Total: ${valid.length} produtos válidos (Shopee: ${shopee.length}, ML: ${ml.length})`);

// ─── Generate CSV ─────────────────────────────────────
// Meta Catalog required columns:
// id, title, description, availability, condition, price, link, image_link, brand
// Optional: sale_price, product_type, google_product_category, custom_label_0-4

const CSV_HEADERS = [
  "id",
  "title",
  "description",
  "availability",
  "condition",
  "price",
  "sale_price",
  "link",
  "image_link",
  "brand",
  "product_type",
  "custom_label_0",  // source: Shopee / Mercado Livre
  "custom_label_1",  // category
  "custom_label_2",  // discount range
  "custom_label_3",  // free shipping
];

function escapeCSV(value) {
  const str = String(value || "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function discountLabel(discount) {
  if (discount >= 50) return "50%+ OFF";
  if (discount >= 30) return "30-49% OFF";
  if (discount >= 15) return "15-29% OFF";
  if (discount > 0) return "1-14% OFF";
  return "Sem desconto";
}

const date = new Date().toISOString().split("T")[0];

const rows = valid.map((p) => {
  const utmParams = `utm_source=meta&utm_medium=cpc&utm_campaign=catalog_${p.categorySlug}&utm_content=${date}`;
  const link = `${SITE_URL}/produto/${p.id}?${utmParams}`;
  const priceStr = `${p.price.toFixed(2)} BRL`;
  const salePriceStr = p.originalPrice && p.originalPrice > p.price
    ? `${p.price.toFixed(2)} BRL`
    : "";
  const fullPriceStr = p.originalPrice && p.originalPrice > p.price
    ? `${p.originalPrice.toFixed(2)} BRL`
    : priceStr;
  const description = `${p.title} - Disponível em ${p.source}. Compare preços e compre com segurança no MarketPay.`;

  return [
    p.id,
    p.title.substring(0, 150),
    description.substring(0, 5000),
    "in stock",
    "new",
    salePriceStr ? fullPriceStr : priceStr,  // price = original price if there's a sale
    salePriceStr,                             // sale_price = discounted price
    link,
    p.image,
    p.brand,
    p.category,
    p.source,
    p.category,
    discountLabel(p.discount),
    p.freeShipping ? "Frete Grátis" : "Frete Pago",
  ].map(escapeCSV).join(",");
});

const csv = [CSV_HEADERS.join(","), ...rows].join("\n");

writeFileSync(OUT_CSV, csv, "utf-8");

console.log(`\n✅ Catálogo gerado: ${OUT_CSV}`);
console.log(`   ${valid.length} produtos`);
console.log(`   ${CSV_HEADERS.length} colunas`);

// Stats
const bySource = {};
const byCat = {};
for (const p of valid) {
  bySource[p.source] = (bySource[p.source] || 0) + 1;
  byCat[p.category] = (byCat[p.category] || 0) + 1;
}
console.log("\nPor fonte:");
Object.entries(bySource).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
console.log("\nPor categoria:");
Object.entries(byCat).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log("\n📋 Próximos passos:");
console.log("1. Acesse: https://business.facebook.com/commerce/");
console.log("2. Crie um Catálogo → Tipo: E-commerce");
console.log("3. Upload manual → Selecione o arquivo docs/meta-catalog.csv");
console.log("4. Volte ao Gerenciador de Anúncios e ative 'Anúncios de catálogo Advantage+'");
