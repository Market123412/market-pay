import { allProducts } from "./src/data/products";
import { getAffiliateUrl } from "./src/lib/affiliate";

console.log("=== AUDITORIA COMPLETA DE URLS DE AFILIADO ===\n");

// ML
const ml = allProducts.filter((p) => p.source === "mercadolivre")[0];
const mlFinal = getAffiliateUrl(ml.affiliateUrl, ml.id, ml.title);
console.log("--- MERCADO LIVRE ---");
console.log("1. affiliateUrl (no produto):", ml.affiliateUrl);
console.log("2. getAffiliateUrl FINAL:", mlFinal);
console.log("   matt_tool presente?", mlFinal.includes("matt_tool=35864491"));
console.log("   Dominio correto?", mlFinal.includes("produto.mercadolivre.com.br"));
console.log();

// Amazon
const amz = allProducts.filter((p) => p.source === "amazon")[0];
const amzFinal = getAffiliateUrl(amz.affiliateUrl, amz.id, amz.title);
console.log("--- AMAZON ---");
console.log("1. affiliateUrl (no produto):", amz.affiliateUrl);
console.log("2. getAffiliateUrl FINAL:", amzFinal);
console.log("   tag presente?", amzFinal.includes("tag=marketpaycomm-20"));
console.log();

// Shopee
const shp = allProducts.filter((p) => p.source === "shopee")[0];
const shpFinal = getAffiliateUrl(shp.affiliateUrl, shp.id, shp.title);
console.log("--- SHOPEE ---");
console.log("1. affiliateUrl (no produto):", shp.affiliateUrl);
console.log("2. getAffiliateUrl FINAL:", shpFinal);
console.log("   Identico ao base?", shpFinal === shp.affiliateUrl);
console.log();

// Check if getAffiliateUrl corrupts ML URLs
console.log("=== VERIFICACAO CRITICA ===");
console.log("ML URL tem '?' antes do matt_tool?", ml.affiliateUrl.includes("?matt_tool"));
console.log("getAffiliateUrl adicionou '&ref='?", mlFinal.includes("&ref="));
console.log("Amazon URL tem '?' antes do tag?", amz.affiliateUrl.includes("?tag") || amz.affiliateUrl.includes("&tag"));

// Check a few more ML URLs for consistency
console.log("\n=== AMOSTRA DE 5 URLs ML FINAIS ===");
allProducts
  .filter((p) => p.source === "mercadolivre")
  .slice(0, 5)
  .forEach((p) => {
    const final = getAffiliateUrl(p.affiliateUrl, p.id, p.title);
    console.log(final);
  });

// Check a few Amazon URLs
console.log("\n=== AMOSTRA DE 3 URLs AMAZON FINAIS ===");
allProducts
  .filter((p) => p.source === "amazon")
  .slice(0, 3)
  .forEach((p) => {
    const final = getAffiliateUrl(p.affiliateUrl, p.id, p.title);
    console.log(final);
  });
