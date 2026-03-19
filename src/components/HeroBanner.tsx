"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { allProducts } from "@/data/products";
import { formatPrice } from "@/lib/affiliate";

const featuredDeals = [...allProducts]
  .filter((p) => p.discount && p.discount >= 25)
  .sort((a, b) => (b.discount || 0) - (a.discount || 0))
  .slice(0, 10);

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % featuredDeals.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + featuredDeals.length) % featuredDeals.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const deal = featuredDeals[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20" />
        <div className="absolute -bottom-10 right-10 h-56 w-56 rounded-full bg-white/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12">
        {/* Top badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Zap size={16} className="text-yellow-300" />
            Melhores ofertas da internet em um só lugar
          </div>
        </div>

        {/* Carousel + CTA Layout */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Left: Text + CTA */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Compare. Economize.
              <br />
              <span className="text-yellow-300">Compre com confiança.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-emerald-100 sm:text-lg lg:mx-0 mx-auto">
              Reunimos os melhores achadinhos com as melhores ofertas do Mercado Livre, Amazon e Shopee para você
              encontrar o menor preço.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/ofertas"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 shadow-lg transition-all hover:bg-yellow-300 hover:text-emerald-900"
              >
                Ver Ofertas do Dia
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/busca?q="
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Explorar Categorias
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-emerald-200 lg:justify-start">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                Mercado Livre
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-orange-400" />
                Amazon
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                Shopee
              </div>
            </div>
          </div>

          {/* Right: Product Carousel */}
          {deal && (
            <div className="relative w-full max-w-sm lg:max-w-md">
              <Link
                href={`/produto/${deal.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-2xl transition-transform hover:scale-[1.02]"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 1024px) 80vw, 400px"
                    priority
                  />
                  {deal.discount && (
                    <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                      -{deal.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
                    {deal.title}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    {deal.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(deal.originalPrice)}
                      </span>
                    )}
                    <span className="text-xl font-bold text-emerald-600">
                      {formatPrice(deal.price)}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Carousel Controls */}
              <button
                onClick={(e) => { e.preventDefault(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>

              {/* Dots */}
              <div className="mt-4 flex justify-center gap-1.5">
                {featuredDeals.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === current ? "w-6 bg-yellow-400" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
