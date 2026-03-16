"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20" />
        <div className="absolute -bottom-10 right-10 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute right-1/3 top-1/4 h-32 w-32 rounded-full bg-white/15" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center sm:py-24">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <Zap size={16} className="text-yellow-300" />
          Melhores ofertas da internet em um só lugar
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Compare. Economize.
          <br />
          <span className="text-yellow-300">Compre com confiança.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-emerald-100 sm:text-xl">
          Reunimos as melhores ofertas do Mercado Livre, Amazon e Shopee para você
          encontrar o menor preço sem sair de um só site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/busca?q=ofertas"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-emerald-700 shadow-lg transition-all hover:bg-yellow-300 hover:text-emerald-900 hover:shadow-xl"
          >
            Ver Ofertas do Dia
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/categoria/eletronicos"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            Explorar Categorias
          </Link>
        </div>
        <div className="mt-10 flex items-center gap-8 text-sm text-emerald-200">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            Mercado Livre
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-400" />
            Amazon
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            Shopee
          </div>
        </div>
      </div>
    </section>
  );
}
