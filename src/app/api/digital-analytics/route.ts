import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

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

// Dados simulados para demonstração - em produção, buscar do banco real
const generateMockData = (days: number) => {
  const products: DigitalProduct[] = [
    {
      id: "info-020",
      title: "Viver de Cílios Plano Master - 15 Técnicas",
      category: "Negócios",
      platform: "hotmart",
      price: 197,
      views: Math.floor(Math.random() * 5000) + 1000,
      clicks: Math.floor(Math.random() * 500) + 100,
      conversionRate: Math.random() * 5 + 1,
      revenue: Math.random() * 5000 + 1000,
    },
    {
      id: "info-021",
      title: "Guitarra Intensiva® 2.0 — Acesso Vitalício",
      category: "Educação",
      platform: "hotmart",
      price: 297,
      views: Math.floor(Math.random() * 3000) + 500,
      clicks: Math.floor(Math.random() * 300) + 50,
      conversionRate: Math.random() * 4 + 0.5,
      revenue: Math.random() * 3000 + 500,
    },
    {
      id: "info-022",
      title: "Desenho Método Fanart 4.0",
      category: "Educação",
      platform: "hotmart",
      price: 97,
      views: Math.floor(Math.random() * 4000) + 800,
      clicks: Math.floor(Math.random() * 400) + 80,
      conversionRate: Math.random() * 6 + 1,
      revenue: Math.random() * 2000 + 400,
    },
    {
      id: "info-023",
      title: "Auxiliar Administrativo",
      category: "Educação",
      platform: "hotmart",
      price: 97,
      views: Math.floor(Math.random() * 2000) + 400,
      clicks: Math.floor(Math.random() * 200) + 40,
      conversionRate: Math.random() * 3 + 0.5,
      revenue: Math.random() * 1000 + 200,
    },
    {
      id: "info-024",
      title: "Curso de Excel — Do Básico ao Avançado",
      category: "Educação",
      platform: "hotmart",
      price: 97,
      views: Math.floor(Math.random() * 3500) + 700,
      clicks: Math.floor(Math.random() * 350) + 70,
      conversionRate: Math.random() * 4 + 1,
      revenue: Math.random() * 1500 + 300,
    },
    {
      id: "info-025",
      title: "Cutilagem para Manicures",
      category: "Negócios",
      platform: "hotmart",
      price: 147,
      views: Math.floor(Math.random() * 2500) + 500,
      clicks: Math.floor(Math.random() * 250) + 50,
      conversionRate: Math.random() * 5 + 1,
      revenue: Math.random() * 2500 + 500,
    },
    {
      id: "info-026",
      title: "Curso Sobrancelhas Perfeitas — Oficial",
      category: "Negócios",
      platform: "hotmart",
      price: 197,
      views: Math.floor(Math.random() * 3000) + 600,
      clicks: Math.floor(Math.random() * 300) + 60,
      conversionRate: Math.random() * 4 + 0.5,
      revenue: Math.random() * 3000 + 600,
    },
    {
      id: "info-027",
      title: "Curso de AUTOCAD — Projetos 2D e 3D",
      category: "Educação",
      platform: "hotmart",
      price: 197,
      views: Math.floor(Math.random() * 1500) + 300,
      clicks: Math.floor(Math.random() * 150) + 30,
      conversionRate: Math.random() * 3 + 0.5,
      revenue: Math.random() * 1000 + 200,
    },
    {
      id: "info-028",
      title: "Curso EJA Supletivo — Ensino Médio",
      category: "Educação",
      platform: "hotmart",
      price: 297,
      views: Math.floor(Math.random() * 1000) + 200,
      clicks: Math.floor(Math.random() * 100) + 20,
      conversionRate: Math.random() * 2 + 0.5,
      revenue: Math.random() * 800 + 150,
    },
    {
      id: "info-010",
      title: "Curso de Violão Método Tríade — Heitor Castro",
      category: "Educação",
      platform: "hotmart",
      price: 197,
      views: Math.floor(Math.random() * 2000) + 400,
      clicks: Math.floor(Math.random() * 200) + 40,
      conversionRate: Math.random() * 3 + 0.5,
      revenue: Math.random() * 1500 + 300,
    },
  ];

  // Generate daily stats
  const dailyStats: DailyStats[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dailyStats.push({
      date: date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 1000) + 200,
      clicks: Math.floor(Math.random() * 100) + 20,
      conversions: Math.floor(Math.random() * 10) + 2,
      revenue: Math.random() * 1000 + 200,
    });
  }

  // Calculate category stats
  const categoryMap = new Map<string, CategoryStats>();
  products.forEach(product => {
    const existing = categoryMap.get(product.category) || {
      category: product.category,
      views: 0,
      clicks: 0,
      revenue: 0,
      products: 0,
    };
    existing.views += product.views;
    existing.clicks += product.clicks;
    existing.revenue += product.revenue;
    existing.products += 1;
    categoryMap.set(product.category, existing);
  });

  return {
    products,
    dailyStats,
    categoryStats: Array.from(categoryMap.values()),
  };
};

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-dashboard-key");
  if (secret !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "30");

    // Em produção, buscar dados reais do Supabase
    // Por enquanto, usar dados simulados
    const data = generateMockData(days);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching digital analytics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
