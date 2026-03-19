import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "data", "ml-products.json");

// ─── Auth ────────────────────────────────────────────
const CLIENT_ID = "4743146735590344";
const CLIENT_SECRET = "bY2ueOEigSfWe2e40DReRkMXVK2k3muT";
const DELAY_MS = 400;

let ACCESS_TOKEN = "";

async function authenticate() {
  const res = await fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Auth failed: " + JSON.stringify(data));
  ACCESS_TOKEN = data.access_token;
  console.log("Authenticated ✓");
}

function authHeaders() {
  return { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJSON(url) {
  const res = await fetch(url, authHeaders());
  if (!res.ok) {
    if (res.status === 429) {
      console.warn("  Rate limited, waiting 5s...");
      await sleep(5000);
      return fetchJSON(url);
    }
    console.warn(`  WARN: ${res.status} for ${url.substring(0, 80)}`);
    return null;
  }
  return res.json();
}

// ─── ML Categories → Site slugs ─────────────────────
const ML_CATEGORIES = [
  { id: "MLB1648", slug: "eletronicos", name: "Eletrônicos" },       // Informática
  { id: "MLB1051", slug: "eletronicos", name: "Eletrônicos" },       // Celulares
  { id: "MLB1000", slug: "eletronicos", name: "Eletrônicos" },       // Eletrônicos
  { id: "MLB1144", slug: "games", name: "Games" },                   // Games
  { id: "MLB1132", slug: "games", name: "Games" },                   // Brinquedos
  { id: "MLB1574", slug: "casa-decoracao", name: "Casa & Decoração" },
  { id: "MLB1430", slug: "moda", name: "Moda" },                     // Calçados/Roupas
  { id: "MLB3937", slug: "moda", name: "Moda" },                     // Relógios/Joias
  { id: "MLB1276", slug: "esportes", name: "Esportes" },
  { id: "MLB1168", slug: "livros", name: "Livros" },
  { id: "MLB1246", slug: "beleza-saude", name: "Beleza & Saúde" },
  { id: "MLB1747", slug: "automotivo", name: "Automotivo" },
];

// ─── Pipeline: highlights → product → items → merge ──
async function getHighlightProductIds(categoryId) {
  const data = await fetchJSON(
    `https://api.mercadolibre.com/highlights/MLB/category/${categoryId}`
  );
  if (!data || !data.content) return [];
  return data.content
    .filter((c) => c.type === "PRODUCT")
    .map((c) => c.id);
}

async function getProductDetails(productId) {
  const data = await fetchJSON(
    `https://api.mercadolibre.com/products/${productId}`
  );
  if (!data || data.status === "inactive") return null;

  const pictures = (data.pictures || [])
    .map((p) => (p.url || "").replace("http://", "https://"))
    .filter((u) => u.startsWith("https://"));

  return {
    productId,
    name: data.name || "",
    pictures,
    permalink: `https://www.mercadolivre.com.br/p/${productId}`,
  };
}

async function getProductItem(productId) {
  const data = await fetchJSON(
    `https://api.mercadolibre.com/products/${productId}/items?status=active&limit=1`
  );
  if (!data || !data.results || data.results.length === 0) return null;
  const item = data.results[0];
  return {
    itemId: item.item_id,
    price: item.price,
    originalPrice: item.original_price || null,
    condition: item.condition,
    freeShipping: item.shipping?.free_shipping || false,
    categoryId: item.category_id,
  };
}

async function main() {
  console.log("Fetching Mercado Livre products via API...\n");
  await authenticate();

  const seenProducts = new Set();
  const products = [];

  for (const cat of ML_CATEGORIES) {
    console.log(`\nCategory: ${cat.name} (${cat.id})`);

    const productIds = await getHighlightProductIds(cat.id);
    await sleep(DELAY_MS);
    console.log(`  Highlights: ${productIds.length} products`);

    for (const pid of productIds) {
      if (seenProducts.has(pid)) continue;
      seenProducts.add(pid);

      // Fetch product details + item data in parallel
      const [details, itemData] = await Promise.all([
        getProductDetails(pid),
        getProductItem(pid),
      ]);
      await sleep(DELAY_MS);

      if (!details || !details.name) continue;
      if (!itemData || !itemData.price || itemData.price <= 0) continue;
      if (details.pictures.length === 0) continue;

      let discount = 0;
      if (itemData.originalPrice && itemData.originalPrice > itemData.price) {
        discount = Math.round(
          ((itemData.originalPrice - itemData.price) / itemData.originalPrice) * 100
        );
      }

      products.push({
        mlProductId: pid,
        mlItemId: itemData.itemId,
        title: details.name,
        price: itemData.price,
        originalPrice:
          itemData.originalPrice && itemData.originalPrice > itemData.price
            ? itemData.originalPrice
            : undefined,
        discount: discount > 0 ? discount : undefined,
        image: details.pictures[0],
        images: details.pictures,
        permalink: details.permalink,
        categorySlug: cat.slug,
        category: cat.name,
        condition: itemData.condition,
        freeShipping: itemData.freeShipping,
      });

      process.stdout.write(`  ✓ ${details.name.substring(0, 50)}...\n`);
    }
  }

  // Also fetch sub-categories for more products
  console.log("\n\nFetching sub-category highlights for more products...");
  for (const cat of ML_CATEGORIES) {
    const subCats = await fetchJSON(
      `https://api.mercadolibre.com/categories/${cat.id}`
    );
    await sleep(DELAY_MS);
    if (!subCats || !subCats.children_categories) continue;

    // Take top 5 sub-categories per main category
    const topSubs = subCats.children_categories.slice(0, 5);
    for (const sub of topSubs) {
      const subProductIds = await getHighlightProductIds(sub.id);
      await sleep(DELAY_MS);
      if (subProductIds.length === 0) continue;

      console.log(`  Sub: ${sub.name} → ${subProductIds.length} products`);

      for (const pid of subProductIds) {
        if (seenProducts.has(pid)) continue;
        seenProducts.add(pid);

        const [details, itemData] = await Promise.all([
          getProductDetails(pid),
          getProductItem(pid),
        ]);
        await sleep(DELAY_MS);

        if (!details || !details.name) continue;
        if (!itemData || !itemData.price || itemData.price <= 0) continue;
        if (details.pictures.length === 0) continue;

        let discount = 0;
        if (itemData.originalPrice && itemData.originalPrice > itemData.price) {
          discount = Math.round(
            ((itemData.originalPrice - itemData.price) / itemData.originalPrice) * 100
          );
        }

        products.push({
          mlProductId: pid,
          mlItemId: itemData.itemId,
          title: details.name,
          price: itemData.price,
          originalPrice:
            itemData.originalPrice && itemData.originalPrice > itemData.price
              ? itemData.originalPrice
              : undefined,
          discount: discount > 0 ? discount : undefined,
          image: details.pictures[0],
          images: details.pictures,
          permalink: details.permalink,
          categorySlug: cat.slug,
          category: cat.name,
          condition: itemData.condition,
          freeShipping: itemData.freeShipping,
        });
      }
    }
  }

  console.log(`\n\nTotal unique ML products: ${products.length}`);

  const catCount = {};
  products.forEach((p) => {
    catCount[p.categorySlug] = (catCount[p.categorySlug] || 0) + 1;
  });
  console.log("Category distribution:");
  Object.entries(catCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  const json = JSON.stringify(products);
  writeFileSync(OUT_PATH, json, "utf-8");
  const sizeMB = (Buffer.byteLength(json) / 1024 / 1024).toFixed(2);
  console.log(`\nWrote ${products.length} products to ${OUT_PATH} (${sizeMB} MB)`);
}

main().catch(console.error);
