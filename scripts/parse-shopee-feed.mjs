import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = join(__dirname, "..", "src", "data", "shopee-feed.csv");
const OUT_PATH = join(__dirname, "..", "src", "data", "shopee-products.json");

// Comprehensive category mapping (global_category1 + global_category2 + global_category3)
const categoryMap = {
  // Eletrônicos
  "Computers & Accessories": "eletronicos",
  "Mobile & Gadgets": "eletronicos",
  "Cameras & Drones": "eletronicos",
  "Audio": "eletronicos",
  "TV & Home Appliances": "eletronicos",
  "Mobile Accessories": "eletronicos",
  "Computer Accessories": "eletronicos",
  "Laptops": "eletronicos",
  "Desktops": "eletronicos",
  "Monitors": "eletronicos",
  "Printers & Scanners": "eletronicos",
  "Storage": "eletronicos",
  "Network Components": "eletronicos",
  "Tablets": "eletronicos",
  "Wearable Devices": "eletronicos",
  "Console Accessories": "eletronicos",
  "Drones": "eletronicos",
  "Security Cameras": "eletronicos",
  "Smart Home Devices": "eletronicos",
  // Casa & Decoração
  "Home & Living": "casa-decoracao",
  "Home Appliances": "casa-decoracao",
  "Furniture": "casa-decoracao",
  "Kitchen & Dining": "casa-decoracao",
  "Bedding": "casa-decoracao",
  "Bath": "casa-decoracao",
  "Lighting": "casa-decoracao",
  "Décor": "casa-decoracao",
  "Cleaning": "casa-decoracao",
  "Gardening": "casa-decoracao",
  "Gardening Tools": "casa-decoracao",
  "Tools & Home Improvement": "casa-decoracao",
  "Storage & Organisation": "casa-decoracao",
  "Laundry": "casa-decoracao",
  "Kitchenware": "casa-decoracao",
  "Small Kitchen Appliances": "casa-decoracao",
  "Large Kitchen Appliances": "casa-decoracao",
  "Cooling & Heating": "casa-decoracao",
  // Moda
  "Men Clothes": "moda",
  "Women Clothes": "moda",
  "Men Shoes": "moda",
  "Women Shoes": "moda",
  "Men Bags": "moda",
  "Women Bags": "moda",
  "Fashion Accessories": "moda",
  "Watches": "moda",
  "Jewellery": "moda",
  "Kids Fashion": "moda",
  "Muslim Fashion": "moda",
  "Tops": "moda",
  "Bottoms": "moda",
  "Dresses": "moda",
  "Underwear & Sleepwear": "moda",
  "Socks & Stockings": "moda",
  "Wallets": "moda",
  // Esportes
  "Sports & Outdoors": "esportes",
  "Sports & Travel": "esportes",
  "Sports Equipment": "esportes",
  "Outdoor Recreation": "esportes",
  "Fitness Equipment": "esportes",
  "Exercise & Fitness": "esportes",
  "Camping & Hiking": "esportes",
  "Cycling": "esportes",
  "Swimming & Diving": "esportes",
  "Fishing": "esportes",
  // Livros
  "Books & Magazines": "livros",
  "Stationery": "livros",
  "Books": "livros",
  "Magazines": "livros",
  // Beleza & Saúde
  "Beauty": "beleza-saude",
  "Health": "beleza-saude",
  "Beauty & Personal Care": "beleza-saude",
  "Skin Care": "beleza-saude",
  "Hair Care": "beleza-saude",
  "Makeup": "beleza-saude",
  "Fragrances": "beleza-saude",
  "Personal Care": "beleza-saude",
  "Bath & Body": "beleza-saude",
  "Medical Supplies": "beleza-saude",
  "Nail Care": "beleza-saude",
  "Men's Care": "beleza-saude",
  "Beauty Tools": "beleza-saude",
  // Automotivo
  "Motorcycles": "automotivo",
  "Automotive": "automotivo",
  "Spare Parts and Accessories for Vehicles": "automotivo",
  "Spare Parts for Automobiles": "automotivo",
  "Car Accessories": "automotivo",
  "Motorcycle Accessories": "automotivo",
  "Car Electronics": "automotivo",
  // Games
  "Gaming & Consoles": "games",
  "Hobbies & Collections": "games",
  "Toys": "games",
  "Toys & Games": "games",
  "Video Games": "games",
  // Alimentos & Bebidas
  "Food & Beverages": "casa-decoracao",
  // Pets
  "Pets": "casa-decoracao",
  "Pet Food & Supplies": "casa-decoracao",
  // Bebê
  "Babies & Kids": "moda",
  "Mom & Baby": "beleza-saude",
  // Viagem
  "Travel & Luggage": "moda",
};

const categoryNames = {
  "eletronicos": "Eletrônicos",
  "casa-decoracao": "Casa & Decoração",
  "moda": "Moda",
  "esportes": "Esportes",
  "livros": "Livros",
  "beleza-saude": "Beleza & Saúde",
  "automotivo": "Automotivo",
  "games": "Games",
};

/**
 * Stream-parse CSV handling multi-line quoted fields without loading entire file
 */
async function main() {
  console.log("Streaming Shopee datafeed CSV...");

  const { createReadStream } = await import("fs");
  const { writeFileSync } = await import("fs");

  const products = [];
  const seenIds = new Set();
  let skipped = 0;
  const unmappedCats = {};

  let headers = null;
  let colIdx = {};
  let buffer = "";
  let inQuotes = false;
  let rowCount = 0;

  function parseCSVRow(line) {
    const fields = [];
    let current = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (q && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          q = !q;
        }
      } else if (ch === ',' && !q) {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    return fields;
  }

  function processRow(line) {
    rowCount++;
    const fields = parseCSVRow(line);

    if (!headers) {
      headers = fields;
      headers.forEach((h, i) => colIdx[h] = i);
      console.log("Headers:", headers);
      return;
    }

    if (fields.length < headers.length) { skipped++; return; }

    const get = (col) => fields[colIdx[col]] || "";

    const itemid = get("itemid");
    const title = get("title");
    const image = get("image_link");
    const salePrice = parseFloat(get("sale_price"));
    const originalPrice = parseFloat(get("price"));
    const discount = parseInt(get("discount_percentage")) || 0;
    const rating = parseFloat(get("item_rating")) || 0;
    const likes = parseInt(get("like")) || 0;
    const shopName = get("shop_name");
    const productLink = get("product_link");
    const affiliateLink = get("product_short link") || productLink;
    const cat1 = get("global_category1");
    const cat2 = get("global_category2");
    const cat3 = get("global_category3");

    if (!title || !image || isNaN(salePrice) || salePrice <= 0 || !affiliateLink) {
      skipped++;
      return;
    }

    if (seenIds.has(itemid)) { skipped++; return; }

    let slug = categoryMap[cat1] || categoryMap[cat2] || categoryMap[cat3];
    if (!slug) {
      const key = `${cat1} > ${cat2} > ${cat3}`;
      unmappedCats[key] = (unmappedCats[key] || 0) + 1;
      skipped++;
      return;
    }

    if (!image.startsWith("http")) { skipped++; return; }

    seenIds.add(itemid);
    const image2 = get("image_link_3");

    products.push({
      itemid,
      title: title.length > 150 ? title.slice(0, 147) + "…" : title,
      price: salePrice,
      originalPrice: originalPrice > salePrice ? originalPrice : undefined,
      discount: discount > 0 ? discount : undefined,
      rating: rating > 0 ? Math.round(rating * 10) / 10 : undefined,
      likes,
      image,
      image2: (image2 && image2.startsWith("http")) ? image2 : undefined,
      shopName,
      categorySlug: slug,
      category: categoryNames[slug],
      affiliateUrl: affiliateLink,
      productLink: productLink || undefined,
    });

    if (products.length % 5000 === 0) {
      console.log(`  ${products.length} products collected...`);
    }
  }

  // Stream through file chunk by chunk
  await new Promise((resolve, reject) => {
    const stream = createReadStream(CSV_PATH, { encoding: "utf-8", highWaterMark: 256 * 1024 });

    stream.on("data", (chunk) => {
      buffer += chunk;

      // Process complete rows from buffer
      while (true) {
        // Find next newline that isn't inside quotes
        let nlIdx = -1;
        let q = inQuotes;
        for (let i = 0; i < buffer.length; i++) {
          if (buffer[i] === '"') q = !q;
          else if ((buffer[i] === '\n') && !q) {
            nlIdx = i;
            break;
          }
        }

        if (nlIdx === -1) {
          inQuotes = q;
          break;
        }

        let line = buffer.slice(0, nlIdx);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        buffer = buffer.slice(nlIdx + 1);
        inQuotes = false;

        // Remove BOM from first line
        if (rowCount === 0 && line.charCodeAt(0) === 0xFEFF) {
          line = line.slice(1);
        }

        processRow(line);
      }
    });

    stream.on("end", () => {
      // Process remaining buffer
      if (buffer.trim()) {
        let line = buffer.trim();
        if (line.endsWith('\r')) line = line.slice(0, -1);
        processRow(line);
      }
      resolve();
    });

    stream.on("error", reject);
  });

  console.log(`\nTotal rows: ${rowCount}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total unique products: ${products.length}`);

  const topUnmapped = Object.entries(unmappedCats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
  if (topUnmapped.length > 0) {
    console.log("\nTop unmapped categories:");
    topUnmapped.forEach(([k, v]) => console.log(`  ${v}: ${k}`));
  }

  // Sort by: rating desc, likes desc, discount desc — pick top 3000
  products.sort((a, b) => {
    const rA = a.rating || 0;
    const rB = b.rating || 0;
    if (rB !== rA) return rB - rA;
    const lA = a.likes || 0;
    const lB = b.likes || 0;
    if (lB !== lA) return lB - lA;
    return (b.discount || 0) - (a.discount || 0);
  });

  const MAX = 3000;
  const top = products.slice(0, MAX);

  const catCount = {};
  top.forEach((p) => {
    catCount[p.categorySlug] = (catCount[p.categorySlug] || 0) + 1;
  });
  console.log(`\nCategory distribution (top ${MAX}):`);
  Object.entries(catCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  const json = JSON.stringify(top);
  writeFileSync(OUT_PATH, json, "utf-8");
  const sizeMB = (Buffer.byteLength(json) / 1024 / 1024).toFixed(2);
  console.log(`\nWrote ${top.length} products to ${OUT_PATH} (${sizeMB} MB)`);
}

main().catch(console.error);
