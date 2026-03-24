import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "data", "ml-products.json");

// ─── Auth ────────────────────────────────────────────
const CLIENT_ID = "4743146735590344";
const CLIENT_SECRET = "bY2ueOEigSfWe2e40DReRkMXVK2k3muT";
const DELAY_MS = 300;

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

async function fetchJSON(url, useAuth = true) {
  const opts = useAuth ? authHeaders() : {};
  const res = await fetch(url, opts);
  if (!res.ok) {
    if (res.status === 429) {
      console.warn("  Rate limited, waiting 5s...");
      await sleep(5000);
      return fetchJSON(url, useAuth);
    }
    // silently skip 4xx
    return null;
  }
  return res.json();
}

// ─── ALL ML Categories → Site slugs ─────────────────
const ML_CATEGORIES = [
  // Eletrônicos
  { id: "MLB1648", slug: "eletronicos", name: "Eletrônicos" },       // Informática
  { id: "MLB1051", slug: "eletronicos", name: "Eletrônicos" },       // Celulares e Telefones
  { id: "MLB1000", slug: "eletronicos", name: "Eletrônicos" },       // Eletrônicos Áudio Vídeo
  { id: "MLB1055", slug: "eletronicos", name: "Eletrônicos" },       // Celulares e Smartphones
  { id: "MLB1039", slug: "eletronicos", name: "Eletrônicos" },       // Câmeras e Acessórios
  { id: "MLB5726", slug: "eletronicos", name: "Eletrônicos" },       // Eletrodomésticos
  // Games
  { id: "MLB1144", slug: "games", name: "Games" },
  { id: "MLB1132", slug: "games", name: "Games" },                   // Brinquedos
  // Casa
  { id: "MLB1574", slug: "casa-decoracao", name: "Casa & Decoração" },
  { id: "MLB1499", slug: "casa-decoracao", name: "Casa & Decoração" },// Indústria e Comércio
  { id: "MLB1500", slug: "casa-decoracao", name: "Casa & Decoração" },// Construção
  { id: "MLB5073", slug: "casa-decoracao", name: "Casa & Decoração" },// Ferramentas
  // Moda
  { id: "MLB1430", slug: "moda", name: "Moda" },                     // Calçados, Roupas, Bolsas
  { id: "MLB3937", slug: "moda", name: "Moda" },                     // Relógios e Joias
  { id: "MLB1384", slug: "moda", name: "Moda" },                     // Bebês (roupas infantis)
  // Esportes
  { id: "MLB1276", slug: "esportes", name: "Esportes" },
  // Livros
  { id: "MLB1168", slug: "livros", name: "Livros" },
  { id: "MLB1182", slug: "livros", name: "Livros" },                 // Instrumentos Musicais
  // Beleza & Saúde
  { id: "MLB1246", slug: "beleza-saude", name: "Beleza & Saúde" },
  { id: "MLB263532", slug: "beleza-saude", name: "Beleza & Saúde" }, // Saúde
  // Automotivo
  { id: "MLB1747", slug: "automotivo", name: "Automotivo" },
  // Pets
  { id: "MLB1071", slug: "casa-decoracao", name: "Casa & Decoração" },// Animais
  // Alimentos
  { id: "MLB1196", slug: "casa-decoracao", name: "Casa & Decoração" },// Alimentos e Bebidas
];

// ─── Massive search queries (public API, no auth) ────
const SEARCH_QUERIES = [
  // MODA FEMININA (high demand)
  { q: "vestido feminino", slug: "moda", name: "Moda" },
  { q: "vestido longo feminino", slug: "moda", name: "Moda" },
  { q: "vestido midi feminino", slug: "moda", name: "Moda" },
  { q: "calça jeans feminina", slug: "moda", name: "Moda" },
  { q: "calça legging feminina", slug: "moda", name: "Moda" },
  { q: "calça pantalona feminina", slug: "moda", name: "Moda" },
  { q: "blusa feminina", slug: "moda", name: "Moda" },
  { q: "blusa cropped feminina", slug: "moda", name: "Moda" },
  { q: "camiseta feminina", slug: "moda", name: "Moda" },
  { q: "saia feminina", slug: "moda", name: "Moda" },
  { q: "short feminino jeans", slug: "moda", name: "Moda" },
  { q: "conjunto feminino", slug: "moda", name: "Moda" },
  { q: "bolsa feminina", slug: "moda", name: "Moda" },
  { q: "bolsa transversal feminina", slug: "moda", name: "Moda" },
  { q: "tênis feminino", slug: "moda", name: "Moda" },
  { q: "sandália feminina", slug: "moda", name: "Moda" },
  { q: "bota feminina", slug: "moda", name: "Moda" },
  { q: "jaqueta feminina", slug: "moda", name: "Moda" },
  { q: "blazer feminino", slug: "moda", name: "Moda" },
  { q: "pijama feminino", slug: "moda", name: "Moda" },
  { q: "biquini feminino", slug: "moda", name: "Moda" },
  { q: "lingerie feminina", slug: "moda", name: "Moda" },
  { q: "macacão feminino", slug: "moda", name: "Moda" },
  { q: "cardigan feminino", slug: "moda", name: "Moda" },
  // MODA MASCULINA
  { q: "camiseta masculina", slug: "moda", name: "Moda" },
  { q: "calça jeans masculina", slug: "moda", name: "Moda" },
  { q: "calça masculina social", slug: "moda", name: "Moda" },
  { q: "bermuda masculina", slug: "moda", name: "Moda" },
  { q: "camisa polo masculina", slug: "moda", name: "Moda" },
  { q: "camisa social masculina", slug: "moda", name: "Moda" },
  { q: "tênis masculino", slug: "moda", name: "Moda" },
  { q: "tênis casual masculino", slug: "moda", name: "Moda" },
  { q: "jaqueta masculina", slug: "moda", name: "Moda" },
  { q: "moletom masculino", slug: "moda", name: "Moda" },
  { q: "cueca boxer masculina", slug: "moda", name: "Moda" },
  { q: "sapatênis masculino", slug: "moda", name: "Moda" },
  { q: "chinelo masculino", slug: "moda", name: "Moda" },
  // ACESSÓRIOS
  { q: "relógio masculino", slug: "moda", name: "Moda" },
  { q: "relógio feminino", slug: "moda", name: "Moda" },
  { q: "óculos de sol", slug: "moda", name: "Moda" },
  { q: "mochila notebook", slug: "moda", name: "Moda" },
  { q: "carteira masculina couro", slug: "moda", name: "Moda" },
  { q: "cinto masculino couro", slug: "moda", name: "Moda" },
  { q: "brinco feminino", slug: "moda", name: "Moda" },
  { q: "colar feminino", slug: "moda", name: "Moda" },
  { q: "pulseira masculina", slug: "moda", name: "Moda" },
  // ELETRÔNICOS (high demand, massive variety)
  { q: "smartphone samsung galaxy", slug: "eletronicos", name: "Eletrônicos" },
  { q: "smartphone motorola", slug: "eletronicos", name: "Eletrônicos" },
  { q: "smartphone xiaomi redmi", slug: "eletronicos", name: "Eletrônicos" },
  { q: "iphone apple", slug: "eletronicos", name: "Eletrônicos" },
  { q: "fone de ouvido bluetooth", slug: "eletronicos", name: "Eletrônicos" },
  { q: "fone de ouvido jbl", slug: "eletronicos", name: "Eletrônicos" },
  { q: "caixa de som bluetooth", slug: "eletronicos", name: "Eletrônicos" },
  { q: "caixa de som jbl", slug: "eletronicos", name: "Eletrônicos" },
  { q: "smart tv 50 polegadas", slug: "eletronicos", name: "Eletrônicos" },
  { q: "smart tv 55 4k", slug: "eletronicos", name: "Eletrônicos" },
  { q: "smart tv 32", slug: "eletronicos", name: "Eletrônicos" },
  { q: "notebook lenovo", slug: "eletronicos", name: "Eletrônicos" },
  { q: "notebook dell", slug: "eletronicos", name: "Eletrônicos" },
  { q: "notebook acer", slug: "eletronicos", name: "Eletrônicos" },
  { q: "tablet samsung", slug: "eletronicos", name: "Eletrônicos" },
  { q: "ipad apple", slug: "eletronicos", name: "Eletrônicos" },
  { q: "smartwatch", slug: "eletronicos", name: "Eletrônicos" },
  { q: "apple watch", slug: "eletronicos", name: "Eletrônicos" },
  { q: "mi band xiaomi", slug: "eletronicos", name: "Eletrônicos" },
  { q: "câmera de segurança wifi", slug: "eletronicos", name: "Eletrônicos" },
  { q: "echo dot alexa", slug: "eletronicos", name: "Eletrônicos" },
  { q: "fire tv stick", slug: "eletronicos", name: "Eletrônicos" },
  { q: "kindle", slug: "eletronicos", name: "Eletrônicos" },
  { q: "mouse gamer", slug: "eletronicos", name: "Eletrônicos" },
  { q: "teclado mecânico gamer", slug: "eletronicos", name: "Eletrônicos" },
  { q: "headset gamer", slug: "eletronicos", name: "Eletrônicos" },
  { q: "monitor gamer", slug: "eletronicos", name: "Eletrônicos" },
  { q: "placa de vídeo", slug: "eletronicos", name: "Eletrônicos" },
  { q: "ssd 1tb", slug: "eletronicos", name: "Eletrônicos" },
  { q: "memória ram ddr4", slug: "eletronicos", name: "Eletrônicos" },
  { q: "carregador portátil power bank", slug: "eletronicos", name: "Eletrônicos" },
  { q: "cabo usb tipo c", slug: "eletronicos", name: "Eletrônicos" },
  { q: "webcam full hd", slug: "eletronicos", name: "Eletrônicos" },
  { q: "roteador wifi", slug: "eletronicos", name: "Eletrônicos" },
  { q: "impressora multifuncional", slug: "eletronicos", name: "Eletrônicos" },
  { q: "projetor portátil", slug: "eletronicos", name: "Eletrônicos" },
  { q: "drone câmera", slug: "eletronicos", name: "Eletrônicos" },
  { q: "gopro câmera ação", slug: "eletronicos", name: "Eletrônicos" },
  // CASA & DECORAÇÃO
  { q: "air fryer", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "aspirador robô", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "cafeteira expresso", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "panela elétrica pressão", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "liquidificador", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "ventilador torre", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "purificador de água", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "jogo de cama", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "travesseiro viscoelástico", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "lâmpada inteligente wifi", slug: "casa-decoracao", name: "Casa & Decoração" },
  { q: "organizador armário", slug: "casa-decoracao", name: "Casa & Decoração" },
  // BELEZA & SAÚDE
  { q: "perfume masculino", slug: "beleza-saude", name: "Beleza & Saúde" },
  { q: "perfume feminino", slug: "beleza-saude", name: "Beleza & Saúde" },
  { q: "secador de cabelo profissional", slug: "beleza-saude", name: "Beleza & Saúde" },
  { q: "chapinha profissional", slug: "beleza-saude", name: "Beleza & Saúde" },
  { q: "maquiagem kit", slug: "beleza-saude", name: "Beleza & Saúde" },
  { q: "protetor solar facial", slug: "beleza-saude", name: "Beleza & Saúde" },
  { q: "aparador barba philips", slug: "beleza-saude", name: "Beleza & Saúde" },
  { q: "hidratante corporal", slug: "beleza-saude", name: "Beleza & Saúde" },
  // ESPORTES
  { q: "whey protein", slug: "esportes", name: "Esportes" },
  { q: "creatina", slug: "esportes", name: "Esportes" },
  { q: "bicicleta", slug: "esportes", name: "Esportes" },
  { q: "esteira elétrica", slug: "esportes", name: "Esportes" },
  { q: "haltere academia", slug: "esportes", name: "Esportes" },
  { q: "barraca camping", slug: "esportes", name: "Esportes" },
  { q: "bola futebol", slug: "esportes", name: "Esportes" },
  { q: "patins inline", slug: "esportes", name: "Esportes" },
  // GAMES
  { q: "playstation 5", slug: "games", name: "Games" },
  { q: "xbox series", slug: "games", name: "Games" },
  { q: "nintendo switch", slug: "games", name: "Games" },
  { q: "controle ps5 dualsense", slug: "games", name: "Games" },
  { q: "jogo ps5", slug: "games", name: "Games" },
  { q: "cadeira gamer", slug: "games", name: "Games" },
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

function buildProduct(details, itemData, slug, name) {
  let discount = 0;
  if (itemData.originalPrice && itemData.originalPrice > itemData.price) {
    discount = Math.round(
      ((itemData.originalPrice - itemData.price) / itemData.originalPrice) * 100
    );
  }
  return {
    mlProductId: details.productId,
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
    categorySlug: slug,
    category: name,
    condition: itemData.condition,
    freeShipping: itemData.freeShipping,
  };
}

async function fetchProductFromHighlight(pid, seenProducts, products, slug, name) {
  if (seenProducts.has(pid)) return;
  seenProducts.add(pid);

  const [details, itemData] = await Promise.all([
    getProductDetails(pid),
    getProductItem(pid),
  ]);
  await sleep(DELAY_MS);

  if (!details || !details.name) return;
  if (!itemData || !itemData.price || itemData.price <= 0) return;
  if (details.pictures.length === 0) return;

  products.push(buildProduct(details, itemData, slug, name));
}

async function main() {
  console.log("=== ML MASSIVE EXPANSION ===\n");
  await authenticate();

  const seenProducts = new Set();
  const products = [];

  // ── Phase 1: Category highlights ──
  console.log("── Phase 1: Category highlights ──");
  for (const cat of ML_CATEGORIES) {
    console.log(`  ${cat.name} (${cat.id})`);
    const productIds = await getHighlightProductIds(cat.id);
    await sleep(DELAY_MS);
    for (const pid of productIds) {
      await fetchProductFromHighlight(pid, seenProducts, products, cat.slug, cat.name);
    }
    console.log(`    → ${productIds.length} highlights, total: ${products.length}`);
  }

  // ── Phase 2: ALL subcategories (level 1 + level 2) ──
  console.log("\n── Phase 2: Deep subcategory scan ──");
  for (const cat of ML_CATEGORIES) {
    const catData = await fetchJSON(`https://api.mercadolibre.com/categories/${cat.id}`);
    await sleep(DELAY_MS);
    if (!catData || !catData.children_categories) continue;

    // ALL subcategories, not just top 10
    for (const sub of catData.children_categories) {
      const subPids = await getHighlightProductIds(sub.id);
      await sleep(DELAY_MS);
      if (subPids.length === 0) continue;

      for (const pid of subPids) {
        await fetchProductFromHighlight(pid, seenProducts, products, cat.slug, cat.name);
      }

      // Level 2: sub-subcategories
      const subData = await fetchJSON(`https://api.mercadolibre.com/categories/${sub.id}`);
      await sleep(DELAY_MS);
      if (!subData || !subData.children_categories) continue;

      for (const sub2 of subData.children_categories.slice(0, 5)) {
        const sub2Pids = await getHighlightProductIds(sub2.id);
        await sleep(DELAY_MS);
        for (const pid of sub2Pids) {
          await fetchProductFromHighlight(pid, seenProducts, products, cat.slug, cat.name);
        }
      }
    }
    console.log(`  ${cat.name} done → total: ${products.length}`);
  }

  // ── Phase 3: Public search API (NO auth — avoids 403) ──
  console.log("\n── Phase 3: Search queries (public API) ──");
  for (const sq of SEARCH_QUERIES) {
    // Use public API without auth token to avoid 403
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(sq.q)}&limit=50&sort=relevance`;
    const searchData = await fetchJSON(url, false); // no auth
    await sleep(DELAY_MS);
    if (!searchData || !searchData.results) continue;

    let added = 0;
    for (const item of searchData.results) {
      if (!item.id || !item.title || !item.price || item.price <= 0) continue;
      if (!item.thumbnail) continue;

      const itemKey = `item-${item.id}`;
      if (seenProducts.has(itemKey)) continue;
      seenProducts.add(itemKey);

      // Also mark catalog product as seen
      if (item.catalog_product_id) {
        seenProducts.add(item.catalog_product_id);
      }

      let discount = 0;
      if (item.original_price && item.original_price > item.price) {
        discount = Math.round(((item.original_price - item.price) / item.original_price) * 100);
      }

      products.push({
        mlProductId: item.catalog_product_id || null,
        mlItemId: item.id,
        title: item.title,
        price: item.price,
        originalPrice: item.original_price && item.original_price > item.price ? item.original_price : undefined,
        discount: discount > 0 ? discount : undefined,
        image: (item.thumbnail || "").replace("http://", "https://"),
        images: [(item.thumbnail || "").replace("http://", "https://")],
        permalink: item.permalink,
        categorySlug: sq.slug,
        category: sq.name,
        condition: item.condition,
        freeShipping: item.shipping?.free_shipping || false,
      });
      added++;
    }
    console.log(`  "${sq.q}" → +${added} (total: ${products.length})`);
  }

  // ── Phase 4: Paginated search for top queries (offset 50) ──
  console.log("\n── Phase 4: Paginated search (page 2) ──");
  const topQueries = SEARCH_QUERIES.filter(sq =>
    sq.slug === "eletronicos" || sq.slug === "moda"
  );
  for (const sq of topQueries) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(sq.q)}&limit=50&offset=50&sort=relevance`;
    const searchData = await fetchJSON(url, false);
    await sleep(DELAY_MS);
    if (!searchData || !searchData.results) continue;

    let added = 0;
    for (const item of searchData.results) {
      if (!item.id || !item.title || !item.price || item.price <= 0) continue;
      if (!item.thumbnail) continue;

      const itemKey = `item-${item.id}`;
      if (seenProducts.has(itemKey)) continue;
      seenProducts.add(itemKey);
      if (item.catalog_product_id) seenProducts.add(item.catalog_product_id);

      let discount = 0;
      if (item.original_price && item.original_price > item.price) {
        discount = Math.round(((item.original_price - item.price) / item.original_price) * 100);
      }

      products.push({
        mlProductId: item.catalog_product_id || null,
        mlItemId: item.id,
        title: item.title,
        price: item.price,
        originalPrice: item.original_price && item.original_price > item.price ? item.original_price : undefined,
        discount: discount > 0 ? discount : undefined,
        image: (item.thumbnail || "").replace("http://", "https://"),
        images: [(item.thumbnail || "").replace("http://", "https://")],
        permalink: item.permalink,
        categorySlug: sq.slug,
        category: sq.name,
        condition: item.condition,
        freeShipping: item.shipping?.free_shipping || false,
      });
      added++;
    }
    if (added > 0) console.log(`  "${sq.q}" p2 → +${added} (total: ${products.length})`);
  }

  // ─── Summary ──────────────────────────────────────
  console.log(`\n\n=== TOTAL: ${products.length} unique ML products ===`);

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
