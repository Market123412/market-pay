"use client";

import { useState } from "react";
import {
  ExternalLink, Star, TrendingUp, BookOpen, Monitor, Briefcase,
  Heart, DollarSign, Shield, Zap, ChevronDown, Search,
  CheckCircle, ArrowRight, Gift, Users, Award, Clock,
} from "lucide-react";
import infoprodutosData from "@/data/infoprodutos.json";

// ─── Types ───────────────────────────────────────────
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
  highlights?: string[];
}

const INFOPRODUTOS = infoprodutosData as Infoproduto[];

// ─── Platform config ─────────────────────────────────
const platformConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  hotmart: { label: "Hotmart", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  eduzz: { label: "Eduzz", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  kiwify: { label: "Kiwify", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  monetizze: { label: "Monetizze", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
};

const categories = [
  { slug: "todos", label: "Todos", icon: Zap, count: 0 },
  { slug: "marketing-digital", label: "Marketing Digital", icon: TrendingUp, count: 0 },
  { slug: "desenvolvimento", label: "Desenvolvimento", icon: Monitor, count: 0 },
  { slug: "negocios", label: "Negócios", icon: Briefcase, count: 0 },
  { slug: "educacao", label: "Educação", icon: BookOpen, count: 0 },
  { slug: "saude", label: "Saúde & Bem-estar", icon: Heart, count: 0 },
  { slug: "financas", label: "Finanças", icon: DollarSign, count: 0 },
];

// Compute category counts
categories.forEach((cat) => {
  cat.count = cat.slug === "todos"
    ? INFOPRODUTOS.length
    : INFOPRODUTOS.filter((p) => p.categorySlug === cat.slug).length;
});

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ─── Stats ───────────────────────────────────────────
const stats = [
  { icon: Gift, value: `${INFOPRODUTOS.length}+`, label: "Produtos curados" },
  { icon: Award, value: "30-70%", label: "Faixa de comissão" },
  { icon: Users, value: "4 plataformas", label: "Hotmart, Eduzz, Kiwify, Monetizze" },
  { icon: Clock, value: "Acesso", label: "imediato após compra" },
];

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
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* ─── Header ─── */}
      <header className="border-b border-gray-800/50 bg-gray-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
              <Zap size={18} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Painel Digital</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5 tracking-wide">PRODUTOS DIGITAIS SELECIONADOS</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Shield size={13} className="text-emerald-500" />
              Plataformas verificadas
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-emerald-500" />
              Garantia de 7 dias
            </span>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/20 px-4 py-1.5 text-xs text-violet-300 mb-6">
            <Zap size={12} className="text-violet-400" />
            Comissões de até 70% por venda
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Os Melhores{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Produtos Digitais
            </span>
            <br className="hidden md:block" />
            do Brasil
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Cursos online, e-books e ferramentas das maiores plataformas brasileiras.
            Selecionados por qualidade, avaliação e potencial de retorno.
          </p>

          {/* Search */}
          <div className="flex items-center max-w-lg mx-auto bg-gray-800/60 rounded-xl border border-gray-700/50 px-4 py-3 backdrop-blur-sm">
            <Search size={18} className="text-gray-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar cursos, e-books, ferramentas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-500"
            />
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-800/30 border border-gray-700/30 p-4">
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-bold">{stat.value}</p>
                  <p className="text-[10px] text-gray-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                    : "bg-gray-800/40 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 border border-gray-700/30"
                }`}
              >
                <Icon size={14} />
                {cat.label}
                <span className={`text-[10px] ${isActive ? "text-violet-200" : "text-gray-600"}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Sort + Count ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="appearance-none bg-gray-800/50 text-gray-300 text-xs rounded-lg px-3 py-2 pr-7 border border-gray-700/50 outline-none cursor-pointer"
          >
            <option value="popular">Mais populares</option>
            <option value="commission">Maior comissão</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </section>

      {/* ─── Product Grid ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => {
            const plat = platformConfig[product.platform];
            const discountPercent = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-800/30 border border-gray-700/30 hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-0.5"
              >
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-[10px] font-bold shadow-lg">
                    {product.badge}
                  </span>
                )}

                {/* Discount badge */}
                {discountPercent >= 30 && (
                  <span className="absolute top-3 right-3 z-10 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold">
                    -{discountPercent}%
                  </span>
                )}

                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Platform + Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-semibold ${plat.color} ${plat.bg} ${plat.border} border rounded-full px-2.5 py-0.5`}>
                      {plat.label}
                    </span>
                    <span className="text-[10px] text-gray-500">{product.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold mb-1.5 line-clamp-2 group-hover:text-violet-300 transition-colors leading-snug">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  {product.highlights && product.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.highlights.map((h, i) => (
                        <span key={i} className="text-[10px] bg-gray-700/40 text-gray-300 rounded-md px-2 py-0.5">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-4 text-[10px] text-gray-500">
                    <span className="flex items-center gap-0.5">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </span>
                    <span>{product.sales} vendas</span>
                    <span className="ml-auto text-emerald-400 font-bold text-xs">
                      {product.commission} comissão
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="mt-auto" />

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between pt-3 border-t border-gray-700/30">
                    <div>
                      {product.originalPrice && (
                        <p className="text-[10px] text-gray-600 line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                      <p className="text-xl font-extrabold">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs font-bold transition-all duration-200 hover:shadow-lg hover:shadow-violet-600/30 hover:scale-[1.03] active:scale-95"
                    >
                      Acessar
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Search size={40} className="mx-auto mb-3 text-gray-700" />
            <p className="text-lg font-medium">Nenhum produto encontrado</p>
            <p className="text-sm mt-1">Tente outra categoria ou termo de busca</p>
          </div>
        )}
      </section>

      {/* ─── How It Works ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-2xl bg-gray-800/20 border border-gray-700/30 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center mb-8">Como Funciona</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Escolha o Produto",
                desc: "Navegue pelas categorias e encontre o produto digital ideal para você.",
              },
              {
                step: "2",
                title: "Acesse a Plataforma",
                desc: "Clique em \"Acessar\" e você será direcionado para a página oficial do produto.",
              },
              {
                step: "3",
                title: "Faça sua Compra",
                desc: "Compre com segurança pela plataforma oficial. Acesso imediato após o pagamento.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mx-auto mb-4 text-lg font-bold shadow-lg shadow-violet-600/20">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Section ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              title: "Compra Segura",
              desc: "Todas as transações são processadas pelas plataformas oficiais com criptografia SSL.",
            },
            {
              icon: CheckCircle,
              title: "Garantia de 7 Dias",
              desc: "Se não gostar, solicite reembolso direto pela plataforma dentro do prazo de garantia.",
            },
            {
              icon: Award,
              title: "Produtos Verificados",
              desc: "Selecionamos apenas produtos com avaliações positivas e histórico comprovado de vendas.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="rounded-xl bg-gray-800/20 border border-gray-700/30 p-6 text-center">
                <Icon size={28} className="mx-auto mb-3 text-emerald-500" />
                <h4 className="font-semibold mb-1.5">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h3 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h3>
        <div className="space-y-3">
          {[
            {
              q: "Os produtos são confiáveis?",
              a: "Sim. Todos os produtos são hospedados em plataformas reconhecidas (Hotmart, Eduzz, Kiwify, Monetizze) que possuem sistemas de pagamento seguro e políticas de reembolso.",
            },
            {
              q: "Como recebo o produto após a compra?",
              a: "Produtos digitais são entregues imediatamente após a confirmação do pagamento, diretamente pela plataforma do produtor via email e área de membros.",
            },
            {
              q: "Posso pedir reembolso?",
              a: "Sim. Todas as plataformas oferecem garantia de 7 dias por padrão. Se não gostar do produto, solicite o reembolso direto na plataforma.",
            },
            {
              q: "Os preços são os mesmos das plataformas oficiais?",
              a: "Sim. Não adicionamos nenhum custo extra. Os preços são os mesmos praticados diretamente nas plataformas dos produtores.",
            },
            {
              q: "Quais formas de pagamento são aceitas?",
              a: "Cartão de crédito (parcelado), boleto bancário, PIX e PayPal — dependendo da plataforma e do produtor.",
            },
          ].map((item, i) => (
            <details key={i} className="group rounded-xl bg-gray-800/20 border border-gray-700/30 overflow-hidden">
              <summary className="cursor-pointer px-5 py-4 text-sm font-medium flex items-center justify-between hover:text-violet-300 transition-colors">
                {item.q}
                <ChevronDown size={16} className="text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-4 text-xs text-gray-400 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-800/50 py-8 text-center">
        <p className="text-xs text-gray-600 mb-1">
          Painel Digital &copy; {new Date().getFullYear()} — Produtos de parceiros verificados
        </p>
        <p className="text-[10px] text-gray-700">
          Este site contém links de afiliado. Ao comprar através dos nossos links, podemos receber uma comissão sem custo adicional para você.
        </p>
      </footer>
    </div>
  );
}
