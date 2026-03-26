"use client";

import { useState, useEffect, useCallback } from "react";

interface MLProduct {
  mlProductId: string;
  title: string;
  permalink: string;
  price: number;
  image: string;
}

interface MLLink {
  ml_product_id: string;
  meli_la_url: string;
  updated_at?: string;
}

interface ClickData {
  product_id: string;
  clicks: number;
}

export default function MLLinksPage() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<MLProduct[]>([]);
  const [savedLinks, setSavedLinks] = useState<Record<string, string>>({});
  const [editingLinks, setEditingLinks] = useState<Record<string, string>>({});
  const [clickData, setClickData] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "linked" | "unlinked" | "top-clicks">("unlinked");
  const [page, setPage] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [bulkText, setBulkText] = useState("");
  const [showBulk, setShowBulk] = useState(false);

  const PER_PAGE = 20;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch ML products list
      const prodRes = await fetch("/api/ml-products-list");
      const prodData = await prodRes.json();
      setProducts(prodData.products || []);

      // Fetch saved meli.la links
      const linksRes = await fetch("/api/ml-links", {
        headers: { "x-dashboard-key": key },
      });
      if (!linksRes.ok) {
        alert("Chave inválida");
        setAuthenticated(false);
        return;
      }
      const linksData = await linksRes.json();
      const map: Record<string, string> = {};
      for (const l of linksData.links || []) {
        map[l.ml_product_id] = l.meli_la_url;
      }
      setSavedLinks(map);

      // Fetch click data for ML products
      const clickRes = await fetch(`/api/analytics?days=30`, {
        headers: { "x-dashboard-key": key },
      });
      if (clickRes.ok) {
        const clickJson = await clickRes.json();
        const cmap: Record<string, number> = {};
        for (const p of clickJson.products || []) {
          if (p.source === "mercadolivre") {
            cmap[p.title] = (p.clicks || 0) + (p.affiliates || 0);
          }
        }
        setClickData(cmap);
      }

      setAuthenticated(true);
    } catch {
      alert("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const filtered = products.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.mlProductId.toLowerCase().includes(q)) return false;
    }
    if (filter === "linked") return !!savedLinks[p.mlProductId];
    if (filter === "unlinked") return !savedLinks[p.mlProductId];
    if (filter === "top-clicks") return true; // sorted by clicks below
    return true;
  });

  const sorted = filter === "top-clicks"
    ? [...filtered].sort((a, b) => (clickData[b.title] || 0) - (clickData[a.title] || 0))
    : filtered;

  const paged = sorted.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(sorted.length / PER_PAGE);

  const linkedCount = products.filter((p) => savedLinks[p.mlProductId]).length;
  const unlinkedCount = products.length - linkedCount;

  const handleSave = async (mlProductId: string) => {
    const url = editingLinks[mlProductId]?.trim();
    if (!url) return;
    if (!url.startsWith("https://meli.la/") && !url.startsWith("http://meli.la/")) {
      setMessage(`❌ Link deve começar com meli.la/`);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/ml-links", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-key": key },
        body: JSON.stringify({ links: [{ ml_product_id: mlProductId, meli_la_url: url }] }),
      });
      if (res.ok) {
        setSavedLinks((prev) => ({ ...prev, [mlProductId]: url }));
        setEditingLinks((prev) => { const n = { ...prev }; delete n[mlProductId]; return n; });
        setMessage(`✅ Link salvo para ${mlProductId}`);
      } else {
        const err = await res.json();
        setMessage(`❌ Erro: ${err.error}`);
      }
    } catch {
      setMessage("❌ Erro de conexão");
    } finally {
      setSaving(false);
    }
  };

  const handleBulkSave = async () => {
    // Parse bulk text: each line = "MLB_ID | meli.la/XXX" or "permalink | meli.la/XXX"
    const lines = bulkText.split("\n").filter((l) => l.trim());
    const links: { ml_product_id: string; meli_la_url: string }[] = [];

    for (const line of lines) {
      const parts = line.split(/[|\t]/).map((s) => s.trim());
      if (parts.length < 2) continue;
      let id = parts[0];
      const url = parts[1];

      // If id is a permalink URL, extract the product ID
      const match = id.match(/MLB\d+/);
      if (match) id = match[0];

      if (id && url && (url.startsWith("https://meli.la/") || url.startsWith("http://meli.la/"))) {
        links.push({ ml_product_id: id, meli_la_url: url });
      }
    }

    if (links.length === 0) {
      setMessage("❌ Nenhum link válido encontrado. Formato: MLB_ID | meli.la/XXX");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/ml-links", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-dashboard-key": key },
        body: JSON.stringify({ links }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(`✅ ${data.saved} links salvos com sucesso!`);
        // Refresh
        const updated = { ...savedLinks };
        for (const l of links) updated[l.ml_product_id] = l.meli_la_url;
        setSavedLinks(updated);
        setBulkText("");
        setShowBulk(false);
      } else {
        const err = await res.json();
        setMessage(`❌ Erro: ${err.error}`);
      }
    } catch {
      setMessage("❌ Erro de conexão");
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-2">🔗 ML Affiliate Links</h1>
          <p className="text-gray-400 mb-6">Gerencie os links meli.la dos produtos Mercado Livre</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
            placeholder="Chave do dashboard..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={fetchData}
            disabled={loading || !key}
            className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
          >
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">🔗 ML Affiliate Links</h1>
            <p className="text-gray-400 text-sm mt-1">
              Cadastre links meli.la gerados no{" "}
              <a
                href="https://www.mercadolivre.com.br/afiliados/linkbuilder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline"
              >
                Portal do Afiliado
              </a>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowBulk(!showBulk)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-purple-700 text-white hover:bg-purple-600 transition"
            >
              📋 Cadastro em Lote
            </button>
            <button
              onClick={fetchData}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 transition"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-gray-400 text-sm">Total Produtos ML</p>
            <p className="text-2xl font-bold text-white">{products.length.toLocaleString("pt-BR")}</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-green-800 p-4">
            <p className="text-gray-400 text-sm">✅ Com link meli.la</p>
            <p className="text-2xl font-bold text-green-400">{linkedCount}</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-red-800 p-4">
            <p className="text-gray-400 text-sm">❌ Sem link (sem comissão)</p>
            <p className="text-2xl font-bold text-red-400">{unlinkedCount.toLocaleString("pt-BR")}</p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-4 text-sm text-white">
            {message}
            <button onClick={() => setMessage("")} className="ml-4 text-gray-500 hover:text-gray-300">✕</button>
          </div>
        )}

        {/* Bulk import */}
        {showBulk && (
          <div className="bg-gray-900 rounded-xl border border-purple-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">Cadastro em Lote</h2>
            <p className="text-gray-400 text-sm mb-3">
              Cole uma linha por produto no formato: <code className="text-yellow-400">MLB_ID | https://meli.la/XXXXX</code>
            </p>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              rows={8}
              placeholder={`MLB50196691 | https://meli.la/2Dn9wLP\nMLB65198110 | https://meli.la/3Ab8xYZ\n...`}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleBulkSave}
                disabled={saving || !bulkText.trim()}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
              >
                {saving ? "Salvando..." : "💾 Salvar em Lote"}
              </button>
              <button
                onClick={() => setShowBulk(false)}
                className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Buscar por nome ou ID..."
            className="flex-1 min-w-[200px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {(["all", "unlinked", "linked", "top-clicks"] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f ? "bg-yellow-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {f === "all" ? "Todos" : f === "unlinked" ? "❌ Sem link" : f === "linked" ? "✅ Com link" : "🔥 Mais clicados"}
            </button>
          ))}
        </div>

        {/* Info */}
        <p className="text-gray-500 text-sm mb-4">
          Mostrando {paged.length} de {sorted.length} produtos • Página {page + 1} de {totalPages || 1}
        </p>

        {/* Product list */}
        <div className="space-y-3">
          {paged.map((p) => {
            const hasLink = !!savedLinks[p.mlProductId];
            const clicks = clickData[p.title] || 0;
            return (
              <div
                key={p.mlProductId}
                className={`bg-gray-900 rounded-xl border p-4 flex flex-col md:flex-row gap-4 items-start ${
                  hasLink ? "border-green-800" : "border-gray-800"
                }`}
              >
                {/* Product image */}
                <img
                  src={p.image}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
                />

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 font-mono">{p.mlProductId}</span>
                    {clicks > 0 && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                        {clicks} cliques
                      </span>
                    )}
                    {hasLink && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">✅ Ativo</span>
                    )}
                  </div>
                  <p className="text-white text-sm truncate">{p.title}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    R$ {p.price.toFixed(2)} •{" "}
                    <a href={p.permalink} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">
                      Ver no ML ↗
                    </a>
                  </p>

                  {/* Link input */}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={editingLinks[p.mlProductId] ?? savedLinks[p.mlProductId] ?? ""}
                      onChange={(e) =>
                        setEditingLinks((prev) => ({ ...prev, [p.mlProductId]: e.target.value }))
                      }
                      placeholder="Cole o link meli.la/XXX aqui..."
                      className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    />
                    <button
                      onClick={() => handleSave(p.mlProductId)}
                      disabled={saving || !editingLinks[p.mlProductId]}
                      className="px-4 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded disabled:opacity-50 transition"
                    >
                      💾
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(p.permalink);
                        setMessage(`📋 Link copiado: ${p.permalink}`);
                      }}
                      className="px-3 py-1.5 bg-gray-800 text-gray-400 text-sm rounded hover:bg-gray-700 transition"
                      title="Copiar permalink para colar no Gerador de Links ML"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-30 hover:bg-gray-700 transition"
            >
              ← Anterior
            </button>
            <span className="px-4 py-2 text-gray-400">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-30 hover:bg-gray-700 transition"
            >
              Próximo →
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mt-8">
          <h2 className="text-lg font-semibold text-white mb-3">📖 Como cadastrar links</h2>
          <ol className="text-gray-400 text-sm space-y-2 list-decimal list-inside">
            <li>Clique no 📋 ao lado do produto para copiar o link do ML</li>
            <li>
              Abra o{" "}
              <a
                href="https://www.mercadolivre.com.br/afiliados/linkbuilder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline"
              >
                Gerador de Links do ML
              </a>{" "}
              e cole o link
            </li>
            <li>Clique em &quot;Gerar&quot; e copie o link meli.la gerado</li>
            <li>Cole o link meli.la no campo do produto aqui e clique em 💾</li>
          </ol>
          <p className="text-gray-500 text-xs mt-4">
            💡 Dica: Use o filtro &quot;🔥 Mais clicados&quot; para priorizar os produtos que mais geram tráfego.
            <br />
            💡 Para cadastro rápido, use o &quot;📋 Cadastro em Lote&quot; com formato: MLB_ID | meli.la/XXX
          </p>
        </div>
      </div>
    </div>
  );
}
