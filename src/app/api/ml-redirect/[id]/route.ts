import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import mlRaw from "@/data/ml-products.json";

interface MLRawProduct {
  mlProductId: string;
  title: string;
  permalink: string;
}

const productMap = new Map<string, MLRawProduct>();
for (const p of mlRaw as MLRawProduct[]) {
  productMap.set(p.mlProductId, p);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // 1. Check Supabase for a saved meli.la link
  try {
    const { data } = await getSupabase()
      .from("ml_affiliate_links")
      .select("meli_la_url")
      .eq("ml_product_id", id)
      .single();

    if (data?.meli_la_url) {
      return NextResponse.redirect(data.meli_la_url, 302);
    }
  } catch {
    // No link found or DB error — fall through to fallback
  }

  // 2. Fallback: redirect to ML search with product title
  const product = productMap.get(id);
  const fallbackTitle = _req.nextUrl.searchParams.get("fallback_title");
  const title = product?.title || (fallbackTitle ? decodeURIComponent(fallbackTitle) : null);

  if (title) {
    const q = encodeURIComponent(title).replace(/%20/g, "-");
    const searchUrl = `https://lista.mercadolivre.com.br/${q}`;
    return NextResponse.redirect(searchUrl, 302);
  }

  // 3. Last resort: ML homepage
  return NextResponse.redirect("https://www.mercadolivre.com.br", 302);
}
