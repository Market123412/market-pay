import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-dashboard-key");
  if (secret !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") || "30");
  const since = new Date();
  since.setDate(since.getDate() - days);

  // Daily stats
  const { data: events, error } = await getSupabase()
    .from("events")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Aggregate by day
  const dailyMap: Record<string, { views: number; clicks: number; affiliates: number }> = {};
  const categoryMap: Record<string, number> = {};
  const sourceMap: Record<string, number> = {};
  const topProducts: Record<string, { title: string; clicks: number; affiliates: number; source: string }> = {};
  let totalViews = 0;
  let totalClicks = 0;
  let totalAffiliates = 0;
  const uniqueSessions = new Set<string>();

  for (const e of events || []) {
    const day = e.created_at.substring(0, 10);
    if (!dailyMap[day]) dailyMap[day] = { views: 0, clicks: 0, affiliates: 0 };

    if (e.session_id) uniqueSessions.add(e.session_id);

    if (e.event_type === "page_view") {
      dailyMap[day].views++;
      totalViews++;
    } else if (e.event_type === "product_click") {
      dailyMap[day].clicks++;
      totalClicks++;
      if (e.product_category) categoryMap[e.product_category] = (categoryMap[e.product_category] || 0) + 1;
      if (e.product_source) sourceMap[e.product_source] = (sourceMap[e.product_source] || 0) + 1;
      if (e.product_id) {
        if (!topProducts[e.product_id]) topProducts[e.product_id] = { title: e.product_title || e.product_id, clicks: 0, affiliates: 0, source: e.product_source || "" };
        topProducts[e.product_id].clicks++;
      }
    } else if (e.event_type === "affiliate_click") {
      dailyMap[day].affiliates++;
      totalAffiliates++;
      if (e.product_id) {
        if (!topProducts[e.product_id]) topProducts[e.product_id] = { title: e.product_title || e.product_id, clicks: 0, affiliates: 0, source: e.product_source || "" };
        topProducts[e.product_id].affiliates++;
      }
    }
  }

  const daily = Object.entries(dailyMap)
    .map(([date, stats]) => ({ date, ...stats }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const categories = Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const sources = Object.entries(sourceMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const products = Object.values(topProducts)
    .sort((a, b) => (b.clicks + b.affiliates) - (a.clicks + a.affiliates))
    .slice(0, 20);

  return NextResponse.json({
    summary: {
      totalViews,
      totalClicks,
      totalAffiliates,
      uniqueVisitors: uniqueSessions.size,
      conversionRate: totalViews > 0 ? ((totalAffiliates / totalViews) * 100).toFixed(2) : "0",
    },
    daily,
    categories,
    sources,
    products,
  });
}
