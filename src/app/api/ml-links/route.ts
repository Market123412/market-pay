import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// GET — fetch all ml affiliate links
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-dashboard-key");
  if (secret !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabase()
    .from("ml_affiliate_links")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ links: data || [] });
}

// POST — upsert ml affiliate links (bulk)
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-dashboard-key");
  if (secret !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { links } = body as {
    links: { ml_product_id: string; meli_la_url: string }[];
  };

  if (!links || !Array.isArray(links) || links.length === 0) {
    return NextResponse.json({ error: "links array required" }, { status: 400 });
  }

  // Validate meli.la format
  const invalid = links.filter(
    (l) => !l.meli_la_url.startsWith("https://meli.la/") && !l.meli_la_url.startsWith("http://meli.la/")
  );
  if (invalid.length > 0) {
    return NextResponse.json(
      { error: `Links inválidos (devem começar com meli.la): ${invalid.map((l) => l.ml_product_id).join(", ")}` },
      { status: 400 }
    );
  }

  const rows = links.map((l) => ({
    ml_product_id: l.ml_product_id,
    meli_la_url: l.meli_la_url.trim(),
    updated_at: new Date().toISOString(),
  }));

  const { data, error } = await getSupabase()
    .from("ml_affiliate_links")
    .upsert(rows, { onConflict: "ml_product_id" })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ saved: data?.length || 0 });
}

// DELETE — remove a link
export async function DELETE(req: NextRequest) {
  const secret = req.headers.get("x-dashboard-key");
  if (secret !== process.env.DASHBOARD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("ml_product_id");

  if (!id) {
    return NextResponse.json({ error: "ml_product_id required" }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from("ml_affiliate_links")
    .delete()
    .eq("ml_product_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: true });
}
