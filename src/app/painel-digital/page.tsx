"use client";

import { useState } from "react";
import { ExternalLink, Star, TrendingUp, BookOpen, Monitor, Briefcase, Heart, DollarSign, Shield, Zap, ChevronDown, Search } from "lucide-react";

// ─── Infoproduto Types ──────────────────────────────
interface Infoproduto {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  commission: string;
  platform: "hotmart" | "eduzz" | "kiwify" | "monetizze";
  category: string;
  categorySlug: string;
  rating: number;
  sales: string;
  image: string;
  affiliateUrl: string;
  badge?: string;
}

// ─── Platform config ─────────────────────────────────
const platformConfig: Record<string, { label: string; color: string; bg: string }> = {
  hotmart: { label: "Hotmart", color: "text-orange-400", bg: "bg-orange-500/20" },
  eduzz: { label: "Eduzz", color: "text-blue-400", bg: "bg-blue-500/20" },
  kiwify: { label: "Kiwify", color: "text-green-400", bg: "bg-green-500/20" },
  monetizze: { label: "Monetizze", color: "text-purple-400", bg: "bg-purple-500/20" },
};

const categories = [
  { slug: "todos", label: "Todos", icon: Zap },
  { slug: "marketing-digital", label: "Marketing Digital", icon: TrendingUp },
  { slug: "desenvolvimento", label: "Desenvolvimento", icon: Monitor },
  { slug: "negocios", label: "Negócios", icon: Briefcase },
  { slug: "educacao", label: "Educação", icon: BookOpen },
  { slug: "saude", label: "Saúde & Bem-estar", icon: Heart },
  { slug: "financas", label: "Finanças", icon: DollarSign },
];

// ─── Products data ───────────────────────────────────
const INFOPRODUTOS: Infoproduto[] = [
  // MARKETING DIGITAL
  {
    id: "info-001",
    title: "Fórmula Negócio Online — Alex Vargas",
    description: "O treinamento mais completo de marketing digital do Brasil. Aprenda a criar seu negócio online do zero com mais de 500 aulas.",
    price: 497.00,
    originalPrice: 997.00,
    commission: "50%",
    platform: "hotmart",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.8,
    sales: "500mil+",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/formula-negocio-online",
    badge: "Best Seller",
  },
  {
    id: "info-002",
    title: "Método Turbo Tráfego — Alex Vargas",
    description: "Domine o tráfego pago com Google Ads e Facebook Ads. Estratégias comprovadas para escalar vendas online.",
    price: 397.00,
    originalPrice: 697.00,
    commission: "40%",
    platform: "hotmart",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.7,
    sales: "200mil+",
    image: "https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/metodo-turbo-trafego",
  },
  {
    id: "info-003",
    title: "Curso Completo de Copywriting — Conrado Adolpho",
    description: "Aprenda a escrever textos que vendem. Técnicas avançadas de persuasão e gatilhos mentais para marketing digital.",
    price: 297.00,
    originalPrice: 597.00,
    commission: "50%",
    platform: "hotmart",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.6,
    sales: "80mil+",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/copywriting-conrado",
  },
  {
    id: "info-004",
    title: "Afiliado Viking — Marcelo Távora",
    description: "Estratégia completa para ganhar dinheiro como afiliado digital. Do zero aos primeiros R$10.000 mensais.",
    price: 197.00,
    originalPrice: 497.00,
    commission: "60%",
    platform: "hotmart",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.5,
    sales: "150mil+",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/afiliado-viking",
    badge: "Alta Comissão",
  },
  {
    id: "info-005",
    title: "Instagram para Negócios — Nath Arcuri",
    description: "Transforme seu Instagram em uma máquina de vendas. Estratégias de conteúdo, reels e stories que convertem.",
    price: 247.00,
    originalPrice: 497.00,
    commission: "40%",
    platform: "kiwify",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.7,
    sales: "120mil+",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    affiliateUrl: "https://kiwify.app/instagram-negocios",
  },
  {
    id: "info-006",
    title: "SEO Expert — Curso Avançado de SEO",
    description: "Domine o Google. Técnicas avançadas de SEO on-page, off-page e conteúdo para ranquear no topo.",
    price: 347.00,
    originalPrice: 697.00,
    commission: "45%",
    platform: "eduzz",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.6,
    sales: "60mil+",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
    affiliateUrl: "https://sun.eduzz.com/seo-expert",
  },
  // DESENVOLVIMENTO
  {
    id: "info-007",
    title: "Full Stack JavaScript — Completo",
    description: "De HTML ao Node.js. React, Next.js, TypeScript, MongoDB, PostgreSQL. Crie aplicações profissionais do zero.",
    price: 397.00,
    originalPrice: 797.00,
    commission: "40%",
    platform: "hotmart",
    category: "Desenvolvimento",
    categorySlug: "desenvolvimento",
    rating: 4.9,
    sales: "180mil+",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/fullstack-js",
    badge: "Top Rated",
  },
  {
    id: "info-008",
    title: "Python Pro — Do Básico ao Avançado",
    description: "Python completo: automação, data science, machine learning, web scraping. +400 aulas práticas.",
    price: 297.00,
    originalPrice: 597.00,
    commission: "45%",
    platform: "hotmart",
    category: "Desenvolvimento",
    categorySlug: "desenvolvimento",
    rating: 4.8,
    sales: "250mil+",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/python-pro",
  },
  {
    id: "info-009",
    title: "Desenvolvimento Mobile — React Native",
    description: "Crie apps iOS e Android com React Native. Do zero ao deploy na App Store e Play Store.",
    price: 347.00,
    originalPrice: 697.00,
    commission: "40%",
    platform: "kiwify",
    category: "Desenvolvimento",
    categorySlug: "desenvolvimento",
    rating: 4.7,
    sales: "90mil+",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    affiliateUrl: "https://kiwify.app/react-native-dev",
  },
  {
    id: "info-010",
    title: "WordPress Profissional — Sites que Vendem",
    description: "Crie sites profissionais com WordPress. Temas, plugins, WooCommerce, SEO e otimização de velocidade.",
    price: 197.00,
    originalPrice: 397.00,
    commission: "50%",
    platform: "eduzz",
    category: "Desenvolvimento",
    categorySlug: "desenvolvimento",
    rating: 4.5,
    sales: "70mil+",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
    affiliateUrl: "https://sun.eduzz.com/wordpress-pro",
  },
  {
    id: "info-011",
    title: "Inteligência Artificial na Prática",
    description: "ChatGPT, Midjourney, automações com IA. Aumente sua produtividade 10x com inteligência artificial.",
    price: 247.00,
    originalPrice: 497.00,
    commission: "50%",
    platform: "hotmart",
    category: "Desenvolvimento",
    categorySlug: "desenvolvimento",
    rating: 4.8,
    sales: "300mil+",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/ia-pratica",
    badge: "Trending",
  },
  // NEGÓCIOS
  {
    id: "info-012",
    title: "Dropshipping Nacional — Do Zero ao Lucro",
    description: "Monte sua loja de dropshipping nacional. Fornecedores brasileiros, Shopify, e estratégias de venda comprovadas.",
    price: 497.00,
    originalPrice: 997.00,
    commission: "50%",
    platform: "kiwify",
    category: "Negócios",
    categorySlug: "negocios",
    rating: 4.6,
    sales: "100mil+",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    affiliateUrl: "https://kiwify.app/dropshipping-nacional",
    badge: "Popular",
  },
  {
    id: "info-013",
    title: "Ecommerce do Zero — Loja Virtual Lucrativa",
    description: "Crie e escale sua loja virtual. Nuvemshop, tráfego pago, logística, e estratégias de conversão.",
    price: 397.00,
    originalPrice: 797.00,
    commission: "45%",
    platform: "hotmart",
    category: "Negócios",
    categorySlug: "negocios",
    rating: 4.7,
    sales: "85mil+",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/ecommerce-zero",
  },
  {
    id: "info-014",
    title: "Empreendedorismo Digital — Erico Rocha",
    description: "A fórmula de lançamento digital mais famosa do Brasil. Aprenda a lançar produtos digitais com estratégia.",
    price: 997.00,
    originalPrice: 1997.00,
    commission: "30%",
    platform: "hotmart",
    category: "Negócios",
    categorySlug: "negocios",
    rating: 4.8,
    sales: "400mil+",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/formula-lancamento",
    badge: "Premium",
  },
  {
    id: "info-015",
    title: "Amazon FBA Brasil — Venda na Amazon",
    description: "Aprenda a vender na Amazon Brasil e EUA com o programa FBA. Do cadastro à primeira venda.",
    price: 347.00,
    originalPrice: 697.00,
    commission: "40%",
    platform: "monetizze",
    category: "Negócios",
    categorySlug: "negocios",
    rating: 4.5,
    sales: "45mil+",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop",
    affiliateUrl: "https://app.monetizze.com.br/amazon-fba",
  },
  // EDUCAÇÃO
  {
    id: "info-016",
    title: "Inglês Fluente em 6 Meses — Método Comprovado",
    description: "Método imersivo para alcançar fluência em inglês. Conversação, gramática e vocabulário prático do dia a dia.",
    price: 197.00,
    originalPrice: 497.00,
    commission: "50%",
    platform: "hotmart",
    category: "Educação",
    categorySlug: "educacao",
    rating: 4.7,
    sales: "350mil+",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/ingles-fluente",
    badge: "Best Seller",
  },
  {
    id: "info-017",
    title: "Excel do Básico ao Avançado — Dashboards e VBA",
    description: "Domine o Excel completamente. Fórmulas, tabelas dinâmicas, dashboards profissionais e programação VBA.",
    price: 147.00,
    originalPrice: 297.00,
    commission: "50%",
    platform: "eduzz",
    category: "Educação",
    categorySlug: "educacao",
    rating: 4.8,
    sales: "200mil+",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    affiliateUrl: "https://sun.eduzz.com/excel-avancado",
  },
  {
    id: "info-018",
    title: "Oratória e Comunicação — Fale com Confiança",
    description: "Supere o medo de falar em público. Técnicas de oratória, persuasão e comunicação assertiva.",
    price: 197.00,
    originalPrice: 397.00,
    commission: "45%",
    platform: "hotmart",
    category: "Educação",
    categorySlug: "educacao",
    rating: 4.6,
    sales: "110mil+",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/oratoria-comunicacao",
  },
  {
    id: "info-019",
    title: "Design Gráfico Profissional — Canva + Photoshop",
    description: "Crie designs profissionais para redes sociais, logos, e materiais gráficos. Canva Pro + Photoshop.",
    price: 197.00,
    originalPrice: 397.00,
    commission: "40%",
    platform: "kiwify",
    category: "Educação",
    categorySlug: "educacao",
    rating: 4.5,
    sales: "75mil+",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    affiliateUrl: "https://kiwify.app/design-grafico",
  },
  // SAÚDE & BEM-ESTAR
  {
    id: "info-020",
    title: "Dieta Flexível — Emagreça Sem Restrição",
    description: "Método científico de emagrecimento sustentável. Contagem de macros, treino e plano alimentar personalizado.",
    price: 97.00,
    originalPrice: 247.00,
    commission: "60%",
    platform: "hotmart",
    category: "Saúde & Bem-estar",
    categorySlug: "saude",
    rating: 4.6,
    sales: "280mil+",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/dieta-flexivel",
    badge: "Alta Comissão",
  },
  {
    id: "info-021",
    title: "Treino em Casa — Corpo Definido 90 Dias",
    description: "Programa completo de treino em casa sem equipamentos. Vídeos diários, plano alimentar e acompanhamento.",
    price: 147.00,
    originalPrice: 297.00,
    commission: "50%",
    platform: "monetizze",
    category: "Saúde & Bem-estar",
    categorySlug: "saude",
    rating: 4.7,
    sales: "190mil+",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    affiliateUrl: "https://app.monetizze.com.br/treino-casa",
  },
  {
    id: "info-022",
    title: "Meditação e Mindfulness — Paz Interior",
    description: "Reduza ansiedade e estresse com técnicas de meditação guiada. 30 dias de transformação mental.",
    price: 97.00,
    originalPrice: 197.00,
    commission: "50%",
    platform: "hotmart",
    category: "Saúde & Bem-estar",
    categorySlug: "saude",
    rating: 4.8,
    sales: "160mil+",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/meditacao-mindfulness",
  },
  {
    id: "info-023",
    title: "Nutrição Esportiva — Performance Máxima",
    description: "Suplementação, periodização nutricional e receitas para atletas. Maximize seus resultados.",
    price: 197.00,
    originalPrice: 397.00,
    commission: "45%",
    platform: "eduzz",
    category: "Saúde & Bem-estar",
    categorySlug: "saude",
    rating: 4.5,
    sales: "65mil+",
    image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=400&h=300&fit=crop",
    affiliateUrl: "https://sun.eduzz.com/nutricao-esportiva",
  },
  // FINANÇAS
  {
    id: "info-024",
    title: "Investimentos do Zero — Renda Passiva",
    description: "Aprenda a investir na bolsa de valores. Renda fixa, ações, FIIs, criptomoedas e renda passiva.",
    price: 297.00,
    originalPrice: 597.00,
    commission: "50%",
    platform: "hotmart",
    category: "Finanças",
    categorySlug: "financas",
    rating: 4.8,
    sales: "320mil+",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/investimentos-zero",
    badge: "Best Seller",
  },
  {
    id: "info-025",
    title: "Day Trade Profissional — Mini Índice e Mini Dólar",
    description: "Domine o day trade no mercado futuro. Análise técnica, gerenciamento de risco e psicologia do trader.",
    price: 497.00,
    originalPrice: 997.00,
    commission: "40%",
    platform: "monetizze",
    category: "Finanças",
    categorySlug: "financas",
    rating: 4.5,
    sales: "90mil+",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop",
    affiliateUrl: "https://app.monetizze.com.br/day-trade",
  },
  {
    id: "info-026",
    title: "Educação Financeira Completa — Saia das Dívidas",
    description: "Organize suas finanças pessoais. Planejamento financeiro, controle de gastos e construção de patrimônio.",
    price: 97.00,
    originalPrice: 247.00,
    commission: "60%",
    platform: "hotmart",
    category: "Finanças",
    categorySlug: "financas",
    rating: 4.7,
    sales: "450mil+",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/educacao-financeira",
    badge: "Alta Comissão",
  },
  {
    id: "info-027",
    title: "Criptomoedas — Bitcoin e DeFi para Iniciantes",
    description: "Entenda o mundo das criptomoedas. Bitcoin, Ethereum, DeFi, NFTs e como investir com segurança.",
    price: 197.00,
    originalPrice: 397.00,
    commission: "45%",
    platform: "kiwify",
    category: "Finanças",
    categorySlug: "financas",
    rating: 4.6,
    sales: "130mil+",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
    affiliateUrl: "https://kiwify.app/cripto-iniciantes",
  },
  {
    id: "info-028",
    title: "Renda Extra Online — 15 Formas Comprovadas",
    description: "Descubra formas reais de ganhar renda extra pela internet. Freelancer, afiliados, PLR e mais.",
    price: 47.00,
    originalPrice: 147.00,
    commission: "70%",
    platform: "hotmart",
    category: "Finanças",
    categorySlug: "financas",
    rating: 4.4,
    sales: "500mil+",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/renda-extra-online",
    badge: "Alta Comissão",
  },
  // MORE MARKETING / BUSINESS
  {
    id: "info-029",
    title: "Tráfego Pago Completo — Google + Meta Ads",
    description: "Domine Google Ads e Meta Ads (Facebook/Instagram). Campanhas que convertem e escalam suas vendas.",
    price: 397.00,
    originalPrice: 797.00,
    commission: "40%",
    platform: "hotmart",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.8,
    sales: "175mil+",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop",
    affiliateUrl: "https://go.hotmart.com/trafego-pago-completo",
  },
  {
    id: "info-030",
    title: "PLR — Produtos Digitais Prontos para Vender",
    description: "Pacote com +50 e-books e cursos com direito de revenda. Comece a vender produtos digitais hoje.",
    price: 97.00,
    originalPrice: 297.00,
    commission: "70%",
    platform: "kiwify",
    category: "Marketing Digital",
    categorySlug: "marketing-digital",
    rating: 4.3,
    sales: "200mil+",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=300&fit=crop",
    affiliateUrl: "https://kiwify.app/plr-pack",
    badge: "Alta Comissão",
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function PainelDigitalPage() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "commission">("popular");

  const filtered = INFOPRODUTOS
    .filter((p) => activeCategory === "todos" || p.categorySlug === activeCategory)
    .filter((p) =>
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "commission") return parseInt(b.commission) - parseInt(a.commission);
      return 0; // popular = default order
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Painel Digital</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Produtos digitais selecionados</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield size={14} className="text-green-500" />
            <span>Plataformas verificadas</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Produtos Digitais com{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Altas Comissões
          </span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
          Cursos, e-books e ferramentas das maiores plataformas do Brasil.
          Comissões de 30% a 70% por venda.
        </p>
        <div className="flex items-center max-w-md mx-auto bg-gray-800/50 rounded-lg border border-gray-700/50 px-3 py-2">
          <Search size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar produtos digitais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                }`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Sort + Count */}
      <section className="mx-auto max-w-7xl px-4 pb-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">{filtered.length} produtos encontrados</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="appearance-none bg-gray-800/50 text-gray-300 text-xs rounded-lg px-3 py-1.5 pr-7 border border-gray-700/50 outline-none cursor-pointer"
          >
            <option value="popular">Mais populares</option>
            <option value="commission">Maior comissão</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => {
            const plat = platformConfig[product.platform];
            return (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-xl bg-gray-800/40 border border-gray-700/30 hover:border-violet-500/40 transition-all hover:shadow-lg hover:shadow-violet-500/5"
              >
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-lg">
                    {product.badge}
                  </span>
                )}

                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Platform + Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-semibold ${plat.color} ${plat.bg} rounded-full px-2 py-0.5`}>
                      {plat.label}
                    </span>
                    <span className="text-[10px] text-gray-500">{product.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2 group-hover:text-violet-300 transition-colors">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-gray-400 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-0.5">
                      <Star size={10} className="fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </span>
                    <span>{product.sales} vendas</span>
                    <span className="ml-auto text-emerald-400 font-bold text-xs">
                      {product.commission} comissão
                    </span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      {product.originalPrice && (
                        <p className="text-[10px] text-gray-600 line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                      <p className="text-lg font-bold text-white">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white transition-all hover:shadow-lg hover:shadow-violet-600/30 hover:scale-105"
                    >
                      Acessar
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Nenhum produto encontrado</p>
            <p className="text-sm mt-1">Tente outra categoria ou termo de busca</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-6 text-center">
        <p className="text-xs text-gray-600">
          Painel Digital &copy; {new Date().getFullYear()} — Produtos de parceiros verificados
        </p>
      </footer>
    </div>
  );
}
