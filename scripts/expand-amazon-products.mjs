import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "src", "data", "amazon-products.json");

// Read existing products
const existing = JSON.parse(readFileSync(OUT_PATH, "utf-8"));
const seenAsins = new Set(existing.map((p) => p.asin));

console.log(`Existing products: ${existing.length}`);

// ─── Curated Amazon Brazil products ──────────────────
// Each entry: [asin, title, price, originalPrice, category, categorySlug, freeShipping]
const newProducts = [
  // ══════ ELETRÔNICOS - SMARTPHONES ══════
  ["B0DGRK4X9H", "Samsung Galaxy A35 5G 128GB Tela 6.6\" Super AMOLED", 1599, 2099, "Eletrônicos", "eletronicos", true],
  ["B0CQ2H4F96", "Samsung Galaxy A25 5G 128GB Câmera Tripla 50MP", 1199, 1599, "Eletrônicos", "eletronicos", true],
  ["B0CQ2GX4JB", "Samsung Galaxy A15 128GB Tela 6.5\" Super AMOLED", 849, 1199, "Eletrônicos", "eletronicos", true],
  ["B0CN1TNXJP", "Motorola Edge 40 256GB Tela 6.55\" pOLED 144Hz", 1999, 2699, "Eletrônicos", "eletronicos", true],
  ["B0CLP7N83V", "Motorola Moto G54 5G 128GB Tela 6.5\" IPS 120Hz", 999, 1399, "Eletrônicos", "eletronicos", true],
  ["B0D6KJZ4WR", "Motorola Moto G34 5G 128GB Tela 6.5\" HD+ 120Hz", 799, 1099, "Eletrônicos", "eletronicos", true],
  ["B0DGXF2NMP", "iPhone 15 128GB Preto Tela 6.1\" Super Retina XDR", 4999, 6499, "Eletrônicos", "eletronicos", true],
  ["B0CG9HFG2V", "Xiaomi Poco X6 Pro 256GB Tela 6.67\" AMOLED 120Hz", 1699, 2199, "Eletrônicos", "eletronicos", true],
  ["B0CG9GRDP9", "Xiaomi Redmi 13C 128GB Tela 6.74\" HD+ Câmera 50MP", 649, 899, "Eletrônicos", "eletronicos", true],
  ["B0DFZFHKNM", "Realme C55 128GB Tela 6.72\" FHD+ Câmera 64MP", 749, 1099, "Eletrônicos", "eletronicos", true],
  // ══════ ELETRÔNICOS - ÁUDIO ══════
  ["B0CT5QW4YK", "JBL Wave Beam TWS Fone Bluetooth In-Ear IP54", 149, 249, "Eletrônicos", "eletronicos", true],
  ["B0BVH2RH8V", "Sony WF-C700N Fone TWS com Cancelamento de Ruído", 349, 599, "Eletrônicos", "eletronicos", true],
  ["B0CHWRXH8P", "Edifier W820NB Plus Fone Bluetooth ANC Hi-Res", 279, 449, "Eletrônicos", "eletronicos", true],
  ["B0BT9L2MDK", "Soundcore Life Q30 Fone Bluetooth ANC Anker", 249, 399, "Eletrônicos", "eletronicos", true],
  ["B09LYB72GS", "JBL Tune 130NC TWS Fone Bluetooth ANC IPX4", 199, 349, "Eletrônicos", "eletronicos", true],
  ["B0CFQN7R8T", "JBL Tune Flex Fone TWS Bluetooth com ANC", 249, 399, "Eletrônicos", "eletronicos", true],
  ["B0BXRS1MZB", "Marshall Minor III Fone TWS Bluetooth Premium", 399, 649, "Eletrônicos", "eletronicos", true],
  ["B0C8PTZWH6", "JBL Pulse 5 Caixa de Som Bluetooth LED 360°", 1299, 1799, "Eletrônicos", "eletronicos", true],
  ["B0C8PSTX3L", "JBL Xtreme 4 Caixa de Som Bluetooth 100W IP67", 1799, 2499, "Eletrônicos", "eletronicos", true],
  ["B08PZHYWJS", "Edifier R1280T Caixa de Som Monitor Ativo 42W", 499, 699, "Eletrônicos", "eletronicos", true],
  // ══════ ELETRÔNICOS - TVs ══════
  ["B0CXHK3YJR", "Smart TV Samsung 43\" Crystal UHD 4K Gaming Hub", 1799, 2399, "Eletrônicos", "eletronicos", true],
  ["B0CXHKF4JP", "Smart TV Samsung 55\" Crystal UHD 4K Tizen", 2499, 3299, "Eletrônicos", "eletronicos", true],
  ["B0CXHKT9JN", "Smart TV Samsung 65\" Crystal UHD 4K HDR10+", 3299, 4499, "Eletrônicos", "eletronicos", true],
  ["B0CXHM7RJK", "Smart TV LG 50\" 4K UHD ThinQ AI WebOS", 2099, 2799, "Eletrônicos", "eletronicos", true],
  ["B0CXHM9RJM", "Smart TV LG 55\" 4K OLED evo ThinQ AI WebOS", 4999, 6999, "Eletrônicos", "eletronicos", true],
  ["B0CXHN3RJQ", "Smart TV TCL 50\" 4K Google TV Dolby Vision", 1699, 2299, "Eletrônicos", "eletronicos", true],
  ["B0CXHN5RJS", "Smart TV Philco 32\" HD Smart Android TV", 799, 1099, "Eletrônicos", "eletronicos", true],
  // ══════ ELETRÔNICOS - NOTEBOOKS ══════
  ["B0BTMML8K5", "Notebook Acer Aspire 5 Intel i5 12ª Gen 8GB 512GB SSD 15.6\"", 2899, 3699, "Eletrônicos", "eletronicos", true],
  ["B0BTN2L9K7", "Notebook Dell Inspiron 15 Intel i7 12ª Gen 16GB 512GB SSD", 3999, 4999, "Eletrônicos", "eletronicos", true],
  ["B0BTP3M8K9", "Notebook Samsung Book Intel i5 8GB 256GB SSD 15.6\" FHD", 2599, 3299, "Eletrônicos", "eletronicos", true],
  ["B0BTQ4N7KB", "Notebook ASUS Vivobook 15 AMD Ryzen 5 8GB 256GB SSD", 2399, 2999, "Eletrônicos", "eletronicos", true],
  ["B0BTR5P6KD", "MacBook Air M2 8GB 256GB SSD Tela 13.6\" Liquid Retina", 7999, 9999, "Eletrônicos", "eletronicos", true],
  ["B0BTS6Q5KF", "Notebook Gamer Acer Nitro 5 i5 RTX 3050 8GB 512GB", 4499, 5999, "Eletrônicos", "eletronicos", true],
  // ══════ ELETRÔNICOS - TABLETS ══════
  ["B0CFPK3YR9", "Samsung Galaxy Tab S9 FE 128GB Wi-Fi Tela 10.9\"", 2199, 2999, "Eletrônicos", "eletronicos", true],
  ["B0CFPL4ZR1", "Tablet Lenovo Tab M10 Plus 128GB Tela 10.6\" 2K", 999, 1399, "Eletrônicos", "eletronicos", true],
  ["B0CFPM5AR3", "iPad 10ª Geração 64GB Wi-Fi Tela 10.9\" A14 Bionic", 3499, 4499, "Eletrônicos", "eletronicos", true],
  // ══════ ELETRÔNICOS - WEARABLES ══════
  ["B0CSTK3Y5H", "Samsung Galaxy Watch FE 40mm Bluetooth Smartwatch", 999, 1399, "Eletrônicos", "eletronicos", true],
  ["B0BDHX9Z8T", "Amazfit GTS 4 Mini Smartwatch AMOLED GPS Integrado", 449, 699, "Eletrônicos", "eletronicos", true],
  ["B0CHX9SZQT", "Apple Watch Series 9 GPS 41mm Alumínio", 2999, 3999, "Eletrônicos", "eletronicos", true],
  ["B0BDHX7Z6R", "Huawei Band 8 Smartband AMOLED 1.47\" à Prova dÁgua", 179, 299, "Eletrônicos", "eletronicos", true],
  // ══════ ELETRÔNICOS - PERIFÉRICOS / ACESSÓRIOS ══════
  ["B09HM3M5SP", "Logitech G305 Mouse Gamer Sem Fio Lightspeed 12000DPI", 199, 299, "Eletrônicos", "eletronicos", true],
  ["B08N6WRWNX", "Razer DeathAdder V3 Mouse Gamer 30000DPI Ergonômico", 349, 549, "Eletrônicos", "eletronicos", true],
  ["B08N7XRWNZ", "Teclado Mecânico Logitech G413 SE Switches Tácteis", 299, 449, "Eletrônicos", "eletronicos", true],
  ["B08N8YRWP2", "HyperX Alloy Origins Core Teclado Mecânico RGB", 399, 599, "Eletrônicos", "eletronicos", true],
  ["B09HM4M6SQ", "Webcam Logitech Brio 500 Full HD 1080p USB-C", 449, 649, "Eletrônicos", "eletronicos", true],
  ["B08MQIWFJ3", "Hub USB-C 7 em 1 HDMI 4K USB 3.0 SD Card Baseus", 149, 249, "Eletrônicos", "eletronicos", true],
  ["B0BM4WR6RH", "SSD Kingston NV2 1TB NVMe M.2 PCIe Gen4 Leitura 3500MB/s", 349, 499, "Eletrônicos", "eletronicos", true],
  ["B0BM5XR7RJ", "HD Externo Seagate 1TB USB 3.0 Portátil Slim", 279, 399, "Eletrônicos", "eletronicos", true],
  ["B0BM6YR8RL", "Pen Drive SanDisk Ultra 128GB USB 3.0 Até 130MB/s", 49, 79, "Eletrônicos", "eletronicos", true],
  ["B08MQJWFK5", "Carregador USB-C 65W GaN Carga Rápida Baseus", 119, 189, "Eletrônicos", "eletronicos", true],
  ["B0BM7ZR9RN", "Roteador TP-Link Archer AX23 WiFi 6 AX1800 Dual Band", 249, 349, "Eletrônicos", "eletronicos", true],
  ["B0BM8AR1RP", "Impressora Multifuncional Epson EcoTank L3250 Wi-Fi", 899, 1199, "Eletrônicos", "eletronicos", true],
  ["B0BM9BR2RR", "Ring Stick Up Cam Câmera de Segurança Wi-Fi Indoor", 349, 499, "Eletrônicos", "eletronicos", true],
  ["B0BMACR3RT", "Tomada Inteligente Wi-Fi Positivo Smart Plug 10A", 49, 79, "Eletrônicos", "eletronicos", true],
  ["B0BMBDR4RV", "Lâmpada Inteligente Wi-Fi Positivo Smart RGB 9W", 39, 69, "Eletrônicos", "eletronicos", true],
  // ══════ MODA FEMININA ══════
  ["B0CPJQF8HD", "Vestido Feminino Longo Estampado Floral com Fenda", 89, 159, "Moda", "moda", true],
  ["B0CRWJT6N8", "Vestido Feminino Midi Manga Bufante Elegante", 99, 179, "Moda", "moda", true],
  ["B0CPJKR9TZ", "Vestido Feminino Tubinho Canelado Justo Básico", 59, 99, "Moda", "moda", false],
  ["B0CRN6MRH1", "Vestido Feminino Longo Decote V Festa Madrinha", 149, 279, "Moda", "moda", true],
  ["B0CXJQR3HM", "Calça Wide Leg Feminina Cintura Alta Pantalona", 79, 139, "Moda", "moda", true],
  ["B0CRWJV7N2", "Calça Cargo Feminina Cintura Alta com Bolsos", 89, 149, "Moda", "moda", true],
  ["B0CPJLT1UZ", "Calça Flare Feminina Jeans Cintura Alta Boca de Sino", 99, 169, "Moda", "moda", true],
  ["B0CRN7NRJ3", "Blusa Feminina Social Manga Longa Elegante", 69, 119, "Moda", "moda", false],
  ["B0CXJRR4HP", "Blusa Regata Feminina Básica Canelada Kit 3 Peças", 49, 89, "Moda", "moda", false],
  ["B0CPJMR2VZ", "Cardigan Feminino Longo Tricot Inverno", 89, 159, "Moda", "moda", true],
  ["B0CRN8PRK5", "Conjunto Feminino Alfaiataria Blazer + Calça Social", 179, 299, "Moda", "moda", true],
  ["B0CXJSR5HQ", "Macacão Feminino Longo Crepe com Cinto", 109, 189, "Moda", "moda", true],
  ["B0CPJNR3WZ", "Saia Midi Feminina Plissada Cintura Elástica", 69, 119, "Moda", "moda", false],
  ["B0CRN9QRL7", "Jaqueta Jeans Feminina Oversized Destroyed", 119, 199, "Moda", "moda", true],
  ["B0CXJTR6HR", "Sobretudo Feminino Lã Batida Longo com Cinto", 199, 349, "Moda", "moda", true],
  ["B0CPJPR4XZ", "Biquini Feminino Cortininha com Saída de Praia", 69, 119, "Moda", "moda", false],
  ["B0CRNAQRM9", "Body Feminino Manga Longa Canelado Gola Alta", 39, 69, "Moda", "moda", false],
  ["B0CXJUR7HS", "Kit 5 Calcinhas Femininas Cotton Algodão", 39, 69, "Moda", "moda", false],
  ["B0CPJQR5YZ", "Sutiã Push Up Feminino com Renda", 49, 89, "Moda", "moda", false],
  ["B0CRNBRQN1", "Pijama Curto Feminino Verão Estampado Algodão", 49, 89, "Moda", "moda", false],
  // ══════ MODA MASCULINA ══════
  ["B0BX4T3ZSP", "Kit 5 Camisetas Masculinas Dry Fit Academia", 79, 139, "Moda", "moda", true],
  ["B0CRWK3POR", "Calça Cargo Masculina Jogger com Bolsos Laterais", 89, 149, "Moda", "moda", true],
  ["B0CPJDS5MR", "Camisa Masculina Manga Longa Linho Premium", 89, 159, "Moda", "moda", true],
  ["B0BWGJG6JR", "Jaqueta Bomber Masculina Nylon Forrada", 119, 199, "Moda", "moda", true],
  ["B0CXK7NNX2", "Bermuda Masculina Moletom com Bolso Cinza", 49, 89, "Moda", "moda", false],
  ["B0CRWL4QPS", "Shorts Masculino Praia Tactel Estampado Kit 3", 69, 119, "Moda", "moda", false],
  ["B0CPJER6NR", "Calça Masculina Alfaiataria Social Slim", 89, 159, "Moda", "moda", true],
  ["B0BWGKH7KR", "Colete Masculino Puffer Sem Manga Inverno", 99, 179, "Moda", "moda", true],
  ["B0CXK8POY4", "Suéter Masculino Gola V Tricot Lã", 79, 139, "Moda", "moda", true],
  ["B0CRWM5RQT", "Blazer Masculino Casual Slim Fit Preto", 149, 249, "Moda", "moda", true],
  ["B0CPJFR7OR", "Kit 6 Meias Masculinas Cano Médio Algodão", 39, 69, "Moda", "moda", false],
  ["B0BX5JGRQ9", "Bota Masculina Coturno Couro Confort Preta", 149, 249, "Moda", "moda", true],
  // ══════ MODA - ACESSÓRIOS ══════
  ["B0CXK9QR26", "Relógio Casio MRW-200H Masculino Analógico Preto", 149, 219, "Moda", "moda", true],
  ["B0BKJGR4X2", "Relógio Fossil Masculino Grant Chronograph Couro", 499, 799, "Moda", "moda", true],
  ["B0CRN4MJW8", "Relógio Feminino Champion Dourado Analógico", 129, 199, "Moda", "moda", true],
  ["B0CPJGR5PZ", "Bolsa Feminina Clutch Festa com Corrente Dourada", 49, 89, "Moda", "moda", false],
  ["B0CXK1RR38", "Mala de Viagem Média 23kg Rígida 4 Rodas 360°", 249, 399, "Moda", "moda", true],
  ["B0BWGLR8LR", "Boné Masculino Aba Reta Ajustável Preto", 29, 49, "Moda", "moda", false],
  ["B0CRWN6RSU", "Kit 3 Pares Meia Sapatilha Invisível Feminina", 19, 39, "Moda", "moda", false],
  // ══════ CASA & DECORAÇÃO ══════
  ["B0BX4SK8NR", "Robot Aspirador Xiaomi E10 Sucção 4000Pa Wi-Fi", 999, 1499, "Casa & Decoração", "casa-decoracao", true],
  ["B0CK4N3GR2", "Fritadeira Elétrica Air Fryer Philco 5.5L Digital", 349, 499, "Casa & Decoração", "casa-decoracao", true],
  ["B0CRWHR6MT", "Cafeteira Nespresso Vertuo Next Cápsulas", 499, 799, "Casa & Decoração", "casa-decoracao", true],
  ["B0BWGI5RKD", "Liquidificador Oster Xpert Series 1100W 3.2L", 249, 399, "Casa & Decoração", "casa-decoracao", true],
  ["B0CPJSR8RZ", "Ventilador de Torre Arno Eole Control 40cm", 299, 449, "Casa & Decoração", "casa-decoracao", true],
  ["B0CRN1QRL4", "Jogo de Panelas Tramontina Paris 10 Peças Antiaderente", 299, 449, "Casa & Decoração", "casa-decoracao", true],
  ["B0CXJVR9HT", "Luminária de Mesa LED Articulável USB Escritório", 79, 129, "Casa & Decoração", "casa-decoracao", false],
  ["B0CPJTR9SZ", "Cortina Blackout Térmica com Ilhós 2.80x1.80m", 79, 129, "Casa & Decoração", "casa-decoracao", true],
  ["B0CRN2RRM6", "Tapete Sala Felpudo Shaggy 150x200cm Cinza", 149, 249, "Casa & Decoração", "casa-decoracao", true],
  ["B0CXJWR1HU", "Organizador Multiuso para Banheiro Bamboo 3 Andares", 69, 109, "Casa & Decoração", "casa-decoracao", false],
  ["B0CPJUR1TZ", "Umidificador de Ar Ultrassônico 3L com LED", 89, 149, "Casa & Decoração", "casa-decoracao", true],
  ["B0CRN3SRN8", "Chaleira Elétrica Inox 1.7L Desligamento Automático", 99, 159, "Casa & Decoração", "casa-decoracao", true],
  // ══════ BELEZA & SAÚDE ══════
  ["B0CRN9KRVR", "Perfume Masculino Malbec Tradicional O Boticário 100ml", 129, 189, "Beleza & Saúde", "beleza-saude", true],
  ["B0CPJWR5KR", "Perfume Feminino Lily O Boticário 75ml", 139, 199, "Beleza & Saúde", "beleza-saude", true],
  ["B0BX5IR4R8", "Kit Skincare Facial Vitamina C + Ácido Hialurônico", 89, 149, "Beleza & Saúde", "beleza-saude", true],
  ["B0CXJNR4WR", "Escova Secadora Rotating Styler 1200W Bivolt", 149, 249, "Beleza & Saúde", "beleza-saude", true],
  ["B0CRWNR3QK", "Base Líquida Matte HD Ruby Rose FPS30", 29, 49, "Beleza & Saúde", "beleza-saude", false],
  ["B0CPJZR6LR", "Kit Pincéis de Maquiagem Profissional 15 Peças", 49, 89, "Beleza & Saúde", "beleza-saude", false],
  ["B0BX5OR5R0", "Máscara de Cílios Volume Express The Falsies", 34, 54, "Beleza & Saúde", "beleza-saude", false],
  ["B0CXJPR5XR", "Balança Digital Corporal Bioimpedância Bluetooth", 99, 169, "Beleza & Saúde", "beleza-saude", true],
  // ══════ ESPORTES ══════
  ["B0CRN8WRQ5", "Whey Protein Gold Standard Optimum Nutrition 907g", 199, 279, "Esportes", "esportes", true],
  ["B0CPJXR7MR", "Creatina Monohidratada 300g Integral Médica", 79, 119, "Esportes", "esportes", true],
  ["B0BWGSR5MR", "Luva de Treino Academia Grip Palmar com Munhequeira", 39, 69, "Esportes", "esportes", false],
  ["B0CXJLR3VR", "Elástico de Resistência Kit 5 Faixas Exercício", 29, 49, "Esportes", "esportes", false],
  ["B0CRN5NWR8", "Garrafa de Água 2 Litros com Marcador de Horário", 29, 49, "Esportes", "esportes", false],
  ["B0CPJYR8NR", "Bicicleta Ergométrica Vertical Magnética Kikos", 799, 1199, "Esportes", "esportes", true],
  ["B0BWGTR6NR", "Rolo de Espuma Foam Roller 45cm Massagem Miofascial", 39, 69, "Esportes", "esportes", false],
  ["B0CXJMR4WR", "Kit Halteres Emborrachados 10kg (Par 5kg) Academia", 89, 149, "Esportes", "esportes", true],
  // ══════ GAMES ══════
  ["B0CF6BZ76P", "PlayStation 5 Slim Digital Edition 1TB Branco", 3199, 3999, "Games", "games", true],
  ["B0CF6CZ87Q", "Xbox Series X 1TB Console Preto", 3499, 4299, "Games", "games", true],
  ["B0CF6DZ98R", "Nintendo Switch OLED Branco 64GB Tela 7\"", 2199, 2799, "Games", "games", true],
  ["B09JQSJD6B", "DualSense Edge Controle PS5 Sem Fio Pro", 999, 1399, "Games", "games", true],
  ["B0BN73Y8NH", "Headset Gamer Razer Kraken V3 X USB 7.1 Surround", 249, 399, "Games", "games", true],
  ["B0CX24V3ZK", "Cadeira Gamer Fortrek Holt Reclinável 120kg", 699, 999, "Games", "games", true],
  ["B08N6XRWNY", "Monitor Gamer Samsung 24\" FHD 75Hz IPS HDMI", 699, 999, "Games", "games", true],
  ["B0BM4WS7RI", "SteelSeries Arctis Nova 3 Headset Gamer Surround", 349, 549, "Games", "games", true],
  // ══════ LIVROS (mais) ══════
  ["B0CPJZS9PR", "Pai Rico, Pai Pobre — Robert Kiyosaki", 29, 54, "Livros", "livros", false],
  ["B0CRN1TRQ2", "A Psicologia Financeira — Morgan Housel", 34, 59, "Livros", "livros", false],
  ["B0CXJNR5YR", "Mindset: A Nova Psicologia do Sucesso — Carol Dweck", 34, 59, "Livros", "livros", false],
  ["B0CPJAT1QR", "O Poder do Hábito — Charles Duhigg", 29, 54, "Livros", "livros", false],
  ["B0CRN2URR4", "Essencialismo — Greg McKeown", 34, 59, "Livros", "livros", false],
  ["B0CXJPR6ZR", "12 Regras para a Vida — Jordan Peterson", 39, 69, "Livros", "livros", false],
];

// Build product objects and deduplicate
let added = 0;
for (const [asin, title, price, originalPrice, category, categorySlug, freeShipping] of newProducts) {
  if (seenAsins.has(asin)) continue;
  seenAsins.add(asin);

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  existing.push({
    asin,
    title,
    price,
    originalPrice,
    discount,
    image: `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`,
    images: [`https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`],
    category,
    categorySlug,
    freeShipping,
  });
  added++;
}

console.log(`Added ${added} new products`);
console.log(`Total: ${existing.length} products`);

// Category distribution
const catCount = {};
existing.forEach((p) => {
  catCount[p.category] = (catCount[p.category] || 0) + 1;
});
console.log("Category distribution:");
Object.entries(catCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

writeFileSync(OUT_PATH, JSON.stringify(existing, null, 2), "utf-8");
console.log(`\nWrote to ${OUT_PATH}`);
