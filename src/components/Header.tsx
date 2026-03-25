"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { categories } from "@/data/categories";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-emerald-600 px-4 py-1.5 text-center text-xs font-medium text-white sm:text-sm">
        🔥 Ofertas com até <strong>50% OFF</strong> — Confira os melhores preços da internet!
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
            <ShoppingBag size={22} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold text-gray-900">Market</span>
            <span className="text-xl font-bold text-emerald-600">Pay</span>
          </div>
        </Link>

        {/* Search - desktop */}
        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/ofertas"
            className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 lg:flex"
          >
            <TrendingUp size={16} />
            Ofertas
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search - mobile */}
      <div className="border-t border-gray-100 px-4 py-2 md:hidden">
        <SearchBar />
      </div>

      {/* Categories bar */}
      <nav className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4">
          <div className="flex gap-1 py-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="shrink-0 rounded-full px-4 py-1.5 text-sm text-gray-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/pascoa"
              className="shrink-0 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
            >
              🐰 Páscoa
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/pascoa"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-100"
            >
              🐰 Páscoa
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
