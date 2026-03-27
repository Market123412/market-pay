"use client";

import { useState, useCallback, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Eye, MousePointer, TrendingUp, Users, DollarSign, Calendar, Download, ExternalLink } from "lucide-react";

interface DigitalProduct {
  id: string;
  title: string;
  category: string;
  platform: string;
  price: number;
  views: number;
  clicks: number;
  conversionRate: number;
  revenue: number;
}

interface DailyStats {
  date: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

interface CategoryStats {
  category: string;
  views: number;
  clicks: number;
  revenue: number;
  products: number;
}

const PLATFORM_COLORS = {
  hotmart: "#FF5722",
  kiwify: "#4CAF50",
  eduzz: "#2196F3",
  monetizze: "#9C27B0",
};

const CATEGORY_COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"
];

export default function DashboardDigitalPage() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/digital-analytics?days=${days}`, {
        headers: { "x-dashboard-key": key },
      });
      if (!res.ok) {
        alert("Chave inválida ou erro ao carregar dados");
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setProducts(data.products || []);
      setDailyStats(data.dailyStats || []);
      setCategoryStats(data.categoryStats || []);
      setAuthenticated(true);
    } catch (error) {
      alert("Erro ao carregar dados");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [key, days]);

  // Calcula totais
  const totals = useMemo(() => {
    return {
      totalViews: products.reduce((sum, p) => sum + p.views, 0),
      totalClicks: products.reduce((sum, p) => sum + p.clicks, 0),
      totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
      totalConversions: products.reduce((sum, p) => sum + (p.clicks * (p.conversionRate / 100)), 0),
      avgConversionRate: products.length > 0 
        ? products.reduce((sum, p) => sum + p.conversionRate, 0) / products.length 
        : 0,
    };
  }, [products]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">💰 Dashboard Digital</h1>
            <p className="text-gray-400 mb-6">Analytics dos produtos digitais</p>
          </div>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
            placeholder="Chave secreta..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={fetchData}
            disabled={loading || !key}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
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
          <h1 className="text-2xl font-bold text-white">💰 Dashboard Digital</h1>
          <div className="flex gap-2">
            {[7, 15, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  days === d ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-blue-500" />
              <span className="text-xs text-gray-500">Visualizações</span>
            </div>
            <div className="text-2xl font-bold text-white">{totals.totalViews.toLocaleString('pt-BR')}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <MousePointer className="w-8 h-8 text-green-500" />
              <span className="text-xs text-gray-500">Cliques</span>
            </div>
            <div className="text-2xl font-bold text-white">{totals.totalClicks.toLocaleString('pt-BR')}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-violet-500" />
              <span className="text-xs text-gray-500">Taxa Conv.</span>
            </div>
            <div className="text-2xl font-bold text-white">{totals.avgConversionRate.toFixed(1)}%</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-orange-500" />
              <span className="text-xs text-gray-500">Conversões</span>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(totals.totalConversions)}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-emerald-500" />
              <span className="text-xs text-gray-500">Receita</span>
            </div>
            <div className="text-2xl font-bold text-emerald-500">
              R$ {totals.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Stats */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">📈 Evolução Diária</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                  labelStyle={{ color: "#F3F4F6" }}
                />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Categories */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">📊 Categorias</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: R$${value.toLocaleString('pt-BR')}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">📦 Produtos</h3>
            <button
              onClick={() => window.open('/painel-digital', '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
            >
              <ExternalLink size={16} />
              Ver Site
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 text-sm">Produto</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm">Categoria</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm">Plataforma</th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm">Visualizações</th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm">Cliques</th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm">Taxa Conv.</th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm">Receita</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-white font-medium">{product.title}</div>
                        <div className="text-gray-400 text-sm">R$ {product.price.toLocaleString('pt-BR')}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{product.category}</td>
                    <td className="py-3 px-4">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: PLATFORM_COLORS[product.platform as keyof typeof PLATFORM_COLORS] || "#666" }}
                      >
                        {product.platform}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-300">{product.views.toLocaleString('pt-BR')}</td>
                    <td className="py-3 px-4 text-right text-gray-300">{product.clicks.toLocaleString('pt-BR')}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-medium ${
                        product.conversionRate >= 3 ? 'text-emerald-500' : 
                        product.conversionRate >= 1 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {product.conversionRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-500 font-medium">
                      R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.open(`/api/digital-analytics/export?key=${key}`, '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
          >
            <Download size={16} />
            Exportar Dados
          </button>
        </div>
      </div>
    </div>
  );
}
