"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface Summary {
  totalViews: number;
  totalClicks: number;
  totalAffiliates: number;
  uniqueVisitors: number;
  conversionRate: string;
}

interface DailyData {
  date: string;
  views: number;
  clicks: number;
  affiliates: number;
}

interface CategoryData { name: string; count: number; }
interface SourceData { name: string; count: number; }
interface ProductData { title: string; clicks: number; affiliates: number; source: string; }

const COLORS = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899"];

const SOURCE_COLORS: Record<string, string> = {
  shopee: "#ee4d2d",
  amazon: "#ff9900",
  mercadolivre: "#ffe600",
};

export default function DashboardPage() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [daily, setDaily] = useState<DailyData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [sources, setSources] = useState<SourceData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?days=${days}`, {
        headers: { "x-dashboard-key": key },
      });
      if (!res.ok) {
        alert("Chave inválida ou erro ao carregar dados");
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setSummary(data.summary);
      setDaily(data.daily);
      setCategories(data.categories);
      setSources(data.sources);
      setProducts(data.products);
      setAuthenticated(true);
    } catch {
      alert("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  }, [key, days]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [days, authenticated, fetchData]);

  const handleExport = () => {
    window.open(`/api/analytics/export?key=${encodeURIComponent(key)}&days=${days}`, "_blank");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-2">📊 MarketPay Analytics</h1>
          <p className="text-gray-400 mb-6">Digite a chave de acesso do dashboard</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
            placeholder="Chave secreta..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchData}
            disabled={loading || !key}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
          >
            {loading ? "Carregando..." : "Acessar Dashboard"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-bold text-white">📊 MarketPay Analytics</h1>
          <div className="flex gap-2">
            {[7, 15, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  days === d ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {d}d
              </button>
            ))}
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-green-700 text-white hover:bg-green-600 transition"
            >
              📥 Excel
            </button>
            <button
              onClick={fetchData}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 transition"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <SummaryCard label="Visitantes" value={summary.uniqueVisitors} color="text-blue-400" />
            <SummaryCard label="Visualizações" value={summary.totalViews} color="text-cyan-400" />
            <SummaryCard label="Cliques em Produtos" value={summary.totalClicks} color="text-amber-400" />
            <SummaryCard label="Cliques Afiliado" value={summary.totalAffiliates} color="text-green-400" />
            <SummaryCard label="Taxa Conversão" value={`${summary.conversionRate}%`} color="text-purple-400" />
          </div>
        )}

        {/* Daily Chart */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Visitas e Cliques por Dia</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="views" name="Visualizações" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" name="Cliques Produto" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="affiliates" name="Cliques Afiliado" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Categories Pie */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Cliques por Categoria</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categories} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sources Bar */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Cliques por Plataforma</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sources}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: 8 }} />
                <Bar dataKey="count" name="Cliques">
                  {sources.map((entry, i) => (
                    <Cell key={i} fill={SOURCE_COLORS[entry.name] || COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Produtos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="pb-3 pr-4">#</th>
                  <th className="pb-3 pr-4">Produto</th>
                  <th className="pb-3 pr-4">Plataforma</th>
                  <th className="pb-3 pr-4 text-right">Cliques</th>
                  <th className="pb-3 text-right">Afiliado</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="border-b border-gray-800/50 text-gray-300">
                    <td className="py-3 pr-4 text-gray-500">{i + 1}</td>
                    <td className="py-3 pr-4 max-w-xs truncate">{p.title}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        p.source === "shopee" ? "bg-red-500/20 text-red-400" :
                        p.source === "amazon" ? "bg-orange-500/20 text-orange-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {p.source}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right">{p.clicks}</td>
                    <td className="py-3 text-right text-green-400">{p.affiliates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          Última atualização: {new Date().toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{typeof value === "number" ? value.toLocaleString("pt-BR") : value}</p>
    </div>
  );
}
