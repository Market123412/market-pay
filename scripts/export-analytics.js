/**
 * Script para exportar dados de analytics para Excel local
 * Uso: node scripts/export-analytics.js
 * 
 * Requer: DASHBOARD_SECRET no .env.local
 * Salva em: docs/analytics/marketpay-analytics-YYYY-MM-DD.xlsx
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: ".env.local" });

const SITE_URL = "https://marketpaycommerce.com.br";
const DASHBOARD_KEY = process.env.DASHBOARD_SECRET;

if (!DASHBOARD_KEY) {
  console.error("❌ DASHBOARD_SECRET não encontrado no .env.local");
  process.exit(1);
}

const days = process.argv[2] || "30";
const url = `${SITE_URL}/api/analytics/export?key=${encodeURIComponent(DASHBOARD_KEY)}&days=${days}`;

console.log(`📊 Exportando dados dos últimos ${days} dias...`);

const outputDir = path.join(__dirname, "..", "docs", "analytics");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const today = new Date().toISOString().split("T")[0];
const outputFile = path.join(outputDir, `marketpay-analytics-${today}.xlsx`);

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    let body = "";
    res.on("data", (c) => (body += c));
    res.on("end", () => {
      console.error(`❌ Erro ${res.statusCode}:`, body);
      process.exit(1);
    });
    return;
  }

  const chunks = [];
  res.on("data", (c) => chunks.push(c));
  res.on("end", () => {
    const buf = Buffer.concat(chunks);
    fs.writeFileSync(outputFile, buf);
    console.log(`✅ Salvo em: ${outputFile}`);
    console.log(`   Tamanho: ${(buf.length / 1024).toFixed(1)} KB`);
  });
}).on("error", (err) => {
  console.error("❌ Erro de conexão:", err.message);
  process.exit(1);
});
