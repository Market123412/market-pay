"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { allProducts } from "@/data/products";
import { formatPrice } from "@/lib/affiliate";
import { shuffle } from "@/lib/shuffle";

const CAROUSEL_COUNT = 6;
const CAROUSEL_INTERVAL = 8000;

const allDeals = allProducts.filter((p) => p.discount && p.discount >= 15);

function MiniProductCard({ product }: { product: typeof allDeals[0] }) {
  return (
    <Link
      href={`/produto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-1 transition-transform group-hover:scale-105"
        />
        {product.discount && (
          <span className="absolute right-0 top-1 rounded-l bg-red-500 px-1 py-0.5 text-[9px] font-bold text-white">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="px-1.5 pb-1.5 pt-1">
        <p className="line-clamp-1 text-[10px] text-gray-600">{product.title}</p>
        <p className="text-xs font-bold text-orange-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

function RotatingCard({ products }: { products: typeof allDeals }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [products.length]);

  const product = products[index];
  if (!product) return null;

  return (
    <Link
      href={`/produto/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-1 transition-transform group-hover:scale-105"
        />
        {product.discount && (
          <span className="absolute right-0 top-1 rounded-l bg-red-500 px-1 py-0.5 text-[9px] font-bold text-white">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="px-1.5 pb-1.5 pt-1">
        <p className="line-clamp-1 text-[10px] text-gray-600">{product.title}</p>
        <p className="text-xs font-bold text-orange-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export default function HeroBanner() {
  // Shuffle deals on each mount so they vary per page load
  const [shuffledDeals, setShuffledDeals] = useState<typeof allDeals>([]);

  useEffect(() => {
    setShuffledDeals(shuffle(allDeals));
  }, []);

  const sideProducts = useMemo(() => {
    if (shuffledDeals.length < 2) return { left: shuffledDeals[0], right: shuffledDeals[1] };
    return { left: shuffledDeals[0], right: shuffledDeals[1] };
  }, [shuffledDeals]);

  // Carousel products — each slot gets its own shuffled pool for rotating
  const carouselSlots = useMemo(() => {
    const pool = shuffledDeals.slice(2, 2 + CAROUSEL_COUNT * 5);
    const slots: (typeof allDeals)[] = [];
    for (let i = 0; i < CAROUSEL_COUNT; i++) {
      const slotPool = pool.filter((_, idx) => idx % CAROUSEL_COUNT === i);
      slots.push(slotPool.length > 0 ? slotPool : pool[i] ? [pool[i]] : []);
    }
    return slots.filter((s) => s.length > 0);
  }, [shuffledDeals]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20" />
        <div className="absolute -bottom-10 right-10 h-56 w-56 rounded-full bg-white/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Top badge */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Zap size={16} className="text-yellow-300" />
            Melhores ofertas da internet em um só lugar
          </div>
        </div>

        {/* Main layout: side product | center text | side product */}
        <div className="flex items-center gap-4">
          {/* Left side fixed product */}
          {sideProducts.left && (
            <div className="hidden lg:block w-40 flex-shrink-0">
              <MiniProductCard product={sideProducts.left} />
            </div>
          )}

          {/* Center: text + CTA */}
          <div className="flex-1 text-center py-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Compare. Economize.
              <br />
              <span className="text-yellow-300">Compre com confiança.</span>
            </h1>
            <p className="mt-3 mx-auto max-w-lg text-sm text-emerald-100 sm:text-base">
              Reunimos os melhores achadinhos com as melhores ofertas do Mercado Livre, Amazon e Shopee para você
              encontrar o menor preço.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/ofertas"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 shadow-lg transition-all hover:bg-yellow-300 hover:text-emerald-900"
              >
                Ver Ofertas do Dia
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/busca?q="
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Explorar Categorias
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-emerald-200">
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

          {/* Right side fixed product */}
          {sideProducts.right && (
            <div className="hidden lg:block w-40 flex-shrink-0">
              <MiniProductCard product={sideProducts.right} />
            </div>
          )}
        </div>

        {/* Bottom: rotating offer cards */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {carouselSlots.map((pool, i) => (
            <RotatingCard key={i} products={pool} />
          ))}
        </div>
      </div>
    </section>
  );
}
