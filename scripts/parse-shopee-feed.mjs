import { createReadStream, writeFileSync } from "fs";
import { createInterface } from "readline";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = join(__dirname, "..", "src", "data", "shopee-feed.csv");
const OUT_PATH = join(__dirname, "..", "src", "data", "shopee-products.json");

// Map Shopee categories to our site categories
const categoryMap = {
  "Computers & Accessories": { slug: "eletronicos", name: "Eletrônicos" },
  "Mobile & Gadgets": { slug: "eletronicos", name: "Eletrônicos" },
  "Cameras & Drones": { slug: "eletronicos", name: "Eletrônicos" },
  "Audio": { slug: "eletronicos", name: "Eletrônicos" },
  "TV & Home Appliances": { slug: "eletronicos", name: "Eletrônicos" },
  "Home Appliances": { slug: "casa-decoracao", name: "Casa & Decoração" },
  "Home & Living": { slug: "casa-decoracao", name: "Casa & Decoração" },
  "Furniture": { slug: "casa-decoracao", name: "Casa & Decoração" },
  "Men Clothes": { slug: "moda", name: "Moda" },
  "Women Clothes": { slug: "moda", name: "Moda" },
  "Men Shoes": { slug: "moda", name: "Moda" },
  "Women Shoes": { slug: "moda", name: "Moda" },
  "Men Bags": { slug: "moda", name: "Moda" },
  "Women Bags": { slug: "moda", name: "Moda" },
  "Fashion Accessories": { slug: "moda", name: "Moda" },
  "Watches": { slug: "moda", name: "Moda" },
  "Sports & Outdoors": { slug: "esportes", name: "Esportes" },
  "Sports & Travel": { slug: "esportes", name: "Esportes" },
  "Books & Magazines": { slug: "livros", name: "Livros" },
  "Beauty": { slug: "beleza-saude", name: "Beleza & Saúde" },
  "Health": { slug: "beleza-saude", name: "Beleza & Saúde" },
  "Beauty & Personal Care": { slug: "beleza-saude", name: "Beleza & Saúde" },
  "Motorcycles": { slug: "automotivo", name: "Automotivo" },
  "Automotive": { slug: "automotivo", name: "Automotivo" },
  "Gaming & Consoles": { slug: "games", name: "Games" },
  "Hobbies & Collections": { slug: "games", name: "Games" },
};

function parseCSVLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

async function main() {
  console.log("Parsing Shopee datafeed CSV...");

  const rl = createInterface({
    input: createReadStream(CSV_PATH, { encoding: "utf-8" }),
    crlfDelay: Infinity,
  });

  let headers = null;
  const products = [];
  let lineCount = 0;
  let skipped = 0;
  const seenIds = new Set();

  for await (const line of rl) {
    lineCount++;

    if (!headers) {
      // Remove BOM if present
      const clean = line.replace(/^\uFEFF/, "");
      headers = parseCSVLine(clean);
      console.log("Headers:", headers);
      continue;
    }

    const fields = parseCSVLine(line);
    if (fields.length < headers.length) {
      skipped++;
      continue;
    }

    const row = {};
    headers.forEach((h, i) => {
      row[h.trim()] = fields[i]?.trim() || "";
    });

    // Skip duplicates
    if (seenIds.has(row.itemid)) {
      skipped++;
      continue;
    }

    // Filters: must have title, image, price, affiliate link
    const title = row.title;
    const image = row.image_link;
    const salePrice = parseFloat(row.sale_price);
    const originalPrice = parseFloat(row.price);
    const discount = parseInt(row.discount_percentage) || 0;
    const rating = parseFloat(row.item_rating) || 0;
    const likes = parseInt(row.like) || 0;
    const shopName = row.shop_name;
    const affiliateLink = row["product_short link"] || row.product_link;
    const category1 = row.global_category1;

    if (!title || !image || isNaN(salePrice) || salePrice <= 0 || !affiliateLink) {
      skipped++;
      continue;
    }

    // Map category
    const mapped = categoryMap[category1];
    if (!mapped) {
      skipped++;
      continue;
    }

    seenIds.add(row.itemid);

    products.push({
      itemid: row.itemid,
      title,
      price: salePrice,
      originalPrice: originalPrice > salePrice ? originalPrice : undefined,
      discount: discount > 0 ? discount : undefined,
      rating: rating > 0 ? Math.round(rating * 10) / 10 : undefined,
      likes,
      image,
      image2: row.image_link_3 || undefined,
      shopName,
      categorySlug: mapped.slug,
      category: mapped.name,
      affiliateUrl: affiliateLink,
      condition: row.condition,
    });

    if (lineCount % 10000 === 0) {
      console.log(`  Processed ${lineCount} lines, ${products.length} products kept...`);
    }
  }

  console.log(`\nTotal lines: ${lineCount}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total unique products: ${products.length}`);

  // Sort by: discount desc, rating desc, likes desc — pick top 800
  products.sort((a, b) => {
    const dA = a.discount || 0;
    const dB = b.discount || 0;
    if (dB !== dA) return dB - dA;
    const rA = a.rating || 0;
    const rB = b.rating || 0;
    if (rB !== rA) return rB - rA;
    return (b.likes || 0) - (a.likes || 0);
  });

  const top = products.slice(0, 800);

  // Category distribution
  const catCount = {};
  top.forEach((p) => {
    catCount[p.categorySlug] = (catCount[p.categorySlug] || 0) + 1;
  });
  console.log("\nCategory distribution:");
  Object.entries(catCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  // Write compact JSON
  writeFileSync(OUT_PATH, JSON.stringify(top, null, 0), "utf-8");
  const sizeMB = (Buffer.byteLength(JSON.stringify(top)) / 1024 / 1024).toFixed(2);
  console.log(`\nWrote ${top.length} products to ${OUT_PATH} (${sizeMB} MB)`);
}

main().catch(console.error);
