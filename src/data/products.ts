export type AffiliateSource = "mercadolivre" | "amazon" | "shopee";

export interface ProductReview {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  source: AffiliateSource;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  freeShipping: boolean;
  seller: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB - Titânio Natural",
    description:
      "O iPhone 15 Pro Max possui chip A17 Pro, câmera de 48MP com zoom óptico de 5x, tela Super Retina XDR de 6.7 polegadas, botão de Ação personalizável e porta USB-C. Design em titânio premium com acabamento escovado.",
    price: 8499.0,
    originalPrice: 9999.0,
    discount: 15,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
    ],
    category: "Eletrônicos",
    categorySlug: "eletronicos",
    source: "mercadolivre",
    affiliateUrl: "https://mercadolivre.com.br",
    rating: 4.8,
    reviewCount: 2345,
    reviews: [
      { author: "Carlos M.", rating: 5, comment: "Melhor celular que já tive! A câmera é incrível.", date: "2024-12-15" },
      { author: "Ana P.", rating: 5, comment: "Super rápido, bateria dura o dia todo.", date: "2024-12-10" },
      { author: "João S.", rating: 4, comment: "Excelente, mas o preço é salgado.", date: "2024-11-28" },
    ],
    freeShipping: true,
    seller: "Apple Store Oficial",
    features: ["Chip A17 Pro", "Câmera 48MP", "Tela 6.7\" OLED", "256GB", "USB-C", "Titânio"],
  },
  {
    id: "2",
    title: "Notebook Samsung Galaxy Book3 Pro 14\" Intel Core i7 16GB 512GB SSD",
    description:
      "Notebook ultrafino Samsung Galaxy Book3 Pro com tela AMOLED de 14 polegadas, processador Intel Core i7 de 13ª geração, 16GB RAM, SSD de 512GB. Ideal para trabalho e entretenimento.",
    price: 5299.0,
    originalPrice: 6799.0,
    discount: 22,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
    ],
    category: "Eletrônicos",
    categorySlug: "eletronicos",
    source: "amazon",
    affiliateUrl: "https://amazon.com.br",
    rating: 4.6,
    reviewCount: 876,
    reviews: [
      { author: "Maria L.", rating: 5, comment: "Notebook leve e potente. Tela AMOLED é espetacular!", date: "2024-12-20" },
      { author: "Pedro R.", rating: 4, comment: "Muito bom para trabalho, mas esquenta um pouco.", date: "2024-12-05" },
    ],
    freeShipping: true,
    seller: "Samsung Oficial",
    features: ["Intel Core i7 13ª Gen", "16GB RAM", "512GB SSD", "Tela AMOLED 14\"", "Windows 11"],
  },
  {
    id: "3",
    title: "Smart TV LG 55\" 4K OLED evo C3 Gaming ThinQ AI",
    description:
      "Smart TV LG OLED evo C3 de 55 polegadas com resolução 4K, processador α9 Gen6 AI, suporte a Dolby Vision e Atmos, ideal para gaming com HDMI 2.1 e 120Hz.",
    price: 3999.0,
    originalPrice: 5499.0,
    discount: 27,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80",
    ],
    category: "Eletrônicos",
    categorySlug: "eletronicos",
    source: "shopee",
    affiliateUrl: "https://shopee.com.br",
    rating: 4.9,
    reviewCount: 1523,
    reviews: [
      { author: "Lucas T.", rating: 5, comment: "Melhor TV para jogos! Imagem perfeita.", date: "2024-12-18" },
      { author: "Fernanda A.", rating: 5, comment: "Cores vibrantes, preto perfeito. Amo essa TV!", date: "2024-12-12" },
    ],
    freeShipping: true,
    seller: "LG Electronics",
    features: ["OLED evo", "4K 120Hz", "HDMI 2.1", "Dolby Vision & Atmos", "ThinQ AI", "WebOS"],
  },
  {
    id: "4",
    title: "Fone de Ouvido Sony WH-1000XM5 Bluetooth Cancelamento de Ruído",
    description:
      "Headphone premium Sony WH-1000XM5 com cancelamento de ruído líder de mercado, áudio Hi-Res, 30 horas de bateria e design ultraleve e confortável.",
    price: 1899.0,
    originalPrice: 2499.0,
    discount: 24,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    ],
    category: "Eletrônicos",
    categorySlug: "eletronicos",
    source: "amazon",
    affiliateUrl: "https://amazon.com.br",
    rating: 4.7,
    reviewCount: 3210,
    reviews: [
      { author: "Bruna C.", rating: 5, comment: "Cancelamento de ruído impressionante. Vale cada centavo!", date: "2024-12-22" },
      { author: "Ricardo M.", rating: 4, comment: "Som excelente, mas pressiona um pouco após horas de uso.", date: "2024-12-15" },
    ],
    freeShipping: true,
    seller: "Sony Store",
    features: ["ANC Premium", "30h bateria", "Hi-Res Audio", "Bluetooth 5.2", "Multipoint", "Dobrável"],
  },
  {
    id: "5",
    title: "Sofá Retrátil e Reclinável 3 Lugares Suede Cinza",
    description:
      "Sofá retrátil e reclinável de 3 lugares em tecido suede cinza. Estrutura em madeira maciça, espuma D33 de alta densidade para máximo conforto. Pés em madeira.",
    price: 1299.0,
    originalPrice: 1899.0,
    discount: 32,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    ],
    category: "Casa & Decoração",
    categorySlug: "casa-decoracao",
    source: "mercadolivre",
    affiliateUrl: "https://mercadolivre.com.br",
    rating: 4.3,
    reviewCount: 567,
    reviews: [
      { author: "Patrícia F.", rating: 5, comment: "Muito confortável! Ótimo custo-benefício.", date: "2024-12-08" },
      { author: "Roberto G.", rating: 4, comment: "Bom sofá, entrega foi rápida.", date: "2024-11-30" },
    ],
    freeShipping: false,
    seller: "MoveisDecor",
    features: ["Retrátil", "Reclinável", "3 Lugares", "Suede", "Espuma D33", "Madeira Maciça"],
  },
  {
    id: "6",
    title: "Air Fryer Mondial Digital 5.5L Grand Family",
    description:
      "Fritadeira elétrica sem óleo Mondial Grand Family com capacidade de 5.5 litros, painel digital touch, timer, 7 funções pré-programadas e potência de 1700W.",
    price: 349.0,
    originalPrice: 499.0,
    discount: 30,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80",
    ],
    category: "Casa & Decoração",
    categorySlug: "casa-decoracao",
    source: "shopee",
    affiliateUrl: "https://shopee.com.br",
    rating: 4.5,
    reviewCount: 4521,
    reviews: [
      { author: "Camila S.", rating: 5, comment: "Melhor compra que fiz! Faço tudo nela.", date: "2024-12-19" },
      { author: "Marcos V.", rating: 4, comment: "Boa capacidade, cozinha bem rápido.", date: "2024-12-14" },
    ],
    freeShipping: true,
    seller: "Mondial Eletro",
    features: ["5.5L", "Digital Touch", "1700W", "Timer", "7 funções", "Sem Óleo"],
  },
  {
    id: "7",
    title: "Tênis Nike Air Max 270 React Masculino",
    description:
      "Tênis Nike Air Max 270 React com tecnologia de amortecimento React e Air Max para máximo conforto. Cabedal em mesh respirável, solado de borracha durável.",
    price: 599.0,
    originalPrice: 899.0,
    discount: 33,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    ],
    category: "Moda",
    categorySlug: "moda",
    source: "amazon",
    affiliateUrl: "https://amazon.com.br",
    rating: 4.6,
    reviewCount: 1876,
    reviews: [
      { author: "Diego L.", rating: 5, comment: "Muito confortável para corrida e dia a dia!", date: "2024-12-21" },
      { author: "Juliana M.", rating: 4, comment: "Bonito e confortável, tamanho certinho.", date: "2024-12-16" },
    ],
    freeShipping: true,
    seller: "Nike Brasil",
    features: ["Air Max 270", "React", "Mesh respirável", "Borracha durável"],
  },
  {
    id: "8",
    title: "Bicicleta Ergométrica Spinning Profissional com Monitor",
    description:
      "Bicicleta ergométrica de spinning profissional com volante de inércia de 13kg, assento ajustável, monitor LCD com frequência cardíaca, tempo e calorias.",
    price: 1199.0,
    originalPrice: 1699.0,
    discount: 29,
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80",
    ],
    category: "Esportes",
    categorySlug: "esportes",
    source: "mercadolivre",
    affiliateUrl: "https://mercadolivre.com.br",
    rating: 4.4,
    reviewCount: 345,
    reviews: [
      { author: "Tatiana R.", rating: 5, comment: "Ótima para treinar em casa. Silenciosa!", date: "2024-12-17" },
      { author: "Gustavo H.", rating: 4, comment: "Boa qualidade pelo preço. Recomendo!", date: "2024-12-09" },
    ],
    freeShipping: false,
    seller: "FitEquipamentos",
    features: ["Volante 13kg", "Monitor LCD", "Assento ajustável", "Profissional", "Silenciosa"],
  },
  {
    id: "9",
    title: "Box Coleção Harry Potter - 7 Livros Capa Dura Especial",
    description:
      "Coleção completa de Harry Potter com 7 livros em capa dura edição especial. Tradução atualizada, ilustrações exclusivas, box colecionador premium.",
    price: 249.0,
    originalPrice: 399.0,
    discount: 38,
    image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    ],
    category: "Livros",
    categorySlug: "livros",
    source: "amazon",
    affiliateUrl: "https://amazon.com.br",
    rating: 4.9,
    reviewCount: 8932,
    reviews: [
      { author: "Amanda K.", rating: 5, comment: "Edição linda! Perfeita para colecionar.", date: "2024-12-23" },
      { author: "Felipe N.", rating: 5, comment: "Presente perfeito. Qualidade excepcional.", date: "2024-12-20" },
    ],
    freeShipping: true,
    seller: "Livraria Cultura",
    features: ["7 Livros", "Capa Dura", "Edição Especial", "Box Colecionador", "Ilustrações Exclusivas"],
  },
  {
    id: "10",
    title: "Kit Skincare Completo - Limpeza, Sérum e Hidratante Facial",
    description:
      "Kit completo de skincare com gel de limpeza facial, sérum de vitamina C, e hidratante com ácido hialurônico. Fórmula vegana e cruelty-free para todos os tipos de pele.",
    price: 189.0,
    originalPrice: 279.0,
    discount: 32,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    ],
    category: "Beleza & Saúde",
    categorySlug: "beleza-saude",
    source: "shopee",
    affiliateUrl: "https://shopee.com.br",
    rating: 4.7,
    reviewCount: 2134,
    reviews: [
      { author: "Isabela P.", rating: 5, comment: "Minha pele ficou incrível em 2 semanas!", date: "2024-12-22" },
      { author: "Renata C.", rating: 5, comment: "Produto vegano de qualidade. Super recomendo!", date: "2024-12-18" },
    ],
    freeShipping: true,
    seller: "BeautyBR",
    features: ["Vitamina C", "Ácido Hialurônico", "Vegano", "Cruelty-free", "3 Produtos"],
  },
  {
    id: "11",
    title: "PlayStation 5 Slim Digital + 2 Controles DualSense",
    description:
      "Console PlayStation 5 Slim edição digital com 1TB SSD, 2 controles DualSense sem fio, suporte a 4K 120fps, ray tracing e áudio 3D Tempest.",
    price: 3299.0,
    originalPrice: 3999.0,
    discount: 18,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80",
    ],
    category: "Games",
    categorySlug: "games",
    source: "mercadolivre",
    affiliateUrl: "https://mercadolivre.com.br",
    rating: 4.8,
    reviewCount: 4567,
    reviews: [
      { author: "Thiago M.", rating: 5, comment: "Console incrível! Gráficos absurdos.", date: "2024-12-24" },
      { author: "Larissa F.", rating: 5, comment: "Comprei para meu filho, ele amou!", date: "2024-12-21" },
    ],
    freeShipping: true,
    seller: "PlayStation Store BR",
    features: ["1TB SSD", "2 DualSense", "4K 120fps", "Ray Tracing", "Áudio 3D", "Digital"],
  },
  {
    id: "12",
    title: "Câmera de Segurança Intelbras WiFi Full HD + Cartão 64GB",
    description:
      "Câmera de segurança Intelbras iM3 WiFi com resolução Full HD, visão noturna, detecção de movimento, áudio bidirecional e armazenamento em nuvem. Acompanha cartão de 64GB.",
    price: 199.0,
    originalPrice: 299.0,
    discount: 33,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    ],
    category: "Eletrônicos",
    categorySlug: "eletronicos",
    source: "shopee",
    affiliateUrl: "https://shopee.com.br",
    rating: 4.4,
    reviewCount: 987,
    reviews: [
      { author: "Eduardo B.", rating: 5, comment: "Imagem nítida, fácil de instalar.", date: "2024-12-19" },
      { author: "Sônia L.", rating: 4, comment: "Funciona bem, app é intuitivo.", date: "2024-12-11" },
    ],
    freeShipping: true,
    seller: "Intelbras Oficial",
    features: ["Full HD", "WiFi", "Visão Noturna", "Detecção Movimento", "Cartão 64GB", "Nuvem"],
  },
];
