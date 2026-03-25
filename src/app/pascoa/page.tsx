import type { Metadata } from "next";
import { allProducts } from "@/data/products";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import EasterProductsClient from "./EasterProductsClient";

const SITE_URL = "https://marketpaycommerce.com.br";

const EASTER_KEYWORDS = /pascoa|páscoa|chocolate|ovo de|coelho|easter|bombom|cacau|trufa|colomba|fondue|forma.*chocolate|candy|doce|brigadeiro|sobremesa|bolo|confeitaria|panettone/i;

function getEasterProducts() {
  return allProducts.filter((p) => EASTER_KEYWORDS.test(p.title) || EASTER_KEYWORDS.test(p.description));
}

export const metadata: Metadata = {
  title: "Ofertas de Páscoa 2026 — Chocolates, Ovos e Presentes | MarketPay",
  description:
    "As melhores ofertas de Páscoa 2026! Chocolates, ovos de Páscoa, bombons, trufas e presentes com até 50% OFF. Compare preços no Mercado Livre, Amazon e Shopee.",
  alternates: { canonical: `${SITE_URL}/pascoa` },
  openGraph: {
    title: "Ofertas de Páscoa 2026 — Até 50% OFF em Chocolates e Presentes",
    description:
      "Encontre os melhores preços em ovos de Páscoa, chocolates, bombons e presentes especiais. Compare ofertas do Mercado Livre, Amazon e Shopee em um só lugar!",
    url: `${SITE_URL}/pascoa`,
    siteName: "MarketPay",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Ofertas de Páscoa — MarketPay",
      },
    ],
  },
};

export default function PascoaPage() {
  const easterProducts = getEasterProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Banner — Easter themed */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-pink-200/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-yellow-200/30 blur-3xl" />
          {/* Easter eggs scattered */}
          <span className="absolute top-8 left-[10%] text-4xl opacity-20 rotate-12">🥚</span>
          <span className="absolute top-16 right-[15%] text-3xl opacity-20 -rotate-12">🐰</span>
          <span className="absolute bottom-8 left-[20%] text-3xl opacity-20 rotate-6">🍫</span>
          <span className="absolute bottom-12 right-[25%] text-4xl opacity-20 -rotate-6">🥚</span>
          <span className="absolute top-4 left-[50%] text-2xl opacity-15">🐣</span>
          <span className="absolute bottom-4 right-[10%] text-3xl opacity-15 rotate-12">🌷</span>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
              <span>🐰</span>
              Páscoa 2026
              <span>🥚</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Ofertas de{" "}
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Páscoa
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Chocolates, ovos de Páscoa, bombons, trufas e presentes especiais
              com os <strong>melhores preços</strong> da internet!
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                Mercado Livre
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                Amazon
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Shopee
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-amber-700">
              {easterProducts.length} produtos encontrados
            </p>
          </div>
        </div>
      </div>

      {/* Products section */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-600">
            Início
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-amber-700">Páscoa 2026</span>
        </nav>

        {/* Products with filters */}
        <EasterProductsClient initialProducts={easterProducts} />
      </div>
    </div>
  );
}
