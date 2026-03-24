import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-dashboard-key") || req.nextUrl.searchParams.get("key");
  if (secret !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = parseInt(req.nextUrl.searchParams.get("days") || "30");
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data: events, error } = await getSupabase()
    .from("events")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (events || []).map((e) => ({
    Data: new Date(e.created_at).toLocaleDateString("pt-BR"),
    Horário: new Date(e.created_at).toLocaleTimeString("pt-BR"),
    Evento: e.event_type === "page_view" ? "Visualização" : e.event_type === "product_click" ? "Clique Produto" : "Clique Afiliado",
    Página: e.page_path || "",
    "ID Produto": e.product_id || "",
    "Produto": e.product_title || "",
    "Categoria": e.product_category || "",
    "Plataforma": e.product_source || "",
    "Preço": e.product_price || "",
    "URL Afiliado": e.affiliate_url || "",
    "Sessão": e.session_id || "",
    "Referência": e.referrer || "",
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns
  const colWidths = Object.keys(rows[0] || {}).map((key) => ({
    wch: Math.max(key.length, 15),
  }));
  ws["!cols"] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, "Eventos");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename=marketpay-analytics-${new Date().toISOString().split("T")[0]}.xlsx`,
    },
  });
}
