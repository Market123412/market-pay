"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produtos, marcas e muito mais..."
        className="flex-1 rounded-l-full border border-r-0 border-gray-300 bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />
      <button
        type="submit"
        className="rounded-r-full bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
