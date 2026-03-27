import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-dashboard-key") || req.nextUrl.searchParams.get("key");
  if (secret !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Buscar dados da API principal
    const analyticsRes = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/digital-analytics`, {
      headers: { "x-dashboard-key": secret },
    });

    if (!analyticsRes.ok) {
      throw new Error("Failed to fetch analytics data");
    }

    const data = await analyticsRes.json();

    // Criar workbook
    const wb = XLSX.utils.book_new();

    // Sheet de Produtos
    const productsData = data.products.map((p: any) => ({
      'Produto': p.title,
      'Categoria': p.category,
      'Plataforma': p.platform,
      'Preço': p.price,
      'Visualizações': p.views,
      'Cliques': p.clicks,
      'Taxa de Conversão (%)': p.conversionRate,
      'Receita': p.revenue,
    }));
    const wsProducts = XLSX.utils.json_to_sheet(productsData);
    XLSX.utils.book_append_sheet(wb, wsProducts, "Produtos");

    // Sheet de Estatísticas Diárias
    const dailyData = data.dailyStats.map((d: any) => ({
      'Data': d.date,
      'Visualizações': d.views,
      'Cliques': d.clicks,
      'Conversões': d.conversions,
      'Receita': d.revenue,
    }));
    const wsDaily = XLSX.utils.json_to_sheet(dailyData);
    XLSX.utils.book_append_sheet(wb, wsDaily, "Estatísticas Diárias");

    // Sheet de Categorias
    const categoryData = data.categoryStats.map((c: any) => ({
      'Categoria': c.category,
      'Visualizações': c.views,
      'Cliques': c.clicks,
      'Receita': c.revenue,
      'Produtos': c.products,
    }));
    const wsCategories = XLSX.utils.json_to_sheet(categoryData);
    XLSX.utils.book_append_sheet(wb, wsCategories, "Categorias");

    // Gerar buffer
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // Retornar arquivo
    const headers = new Headers();
    headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.set("Content-Disposition", `attachment; filename="digital-analytics-${new Date().toISOString().split('T')[0]}.xlsx"`);

    return new Response(buffer, { headers });
  } catch (error) {
    console.error("Error exporting digital analytics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
