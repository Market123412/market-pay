import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      event_type,
      page_path,
      product_id,
      product_title,
      product_category,
      product_source,
      product_price,
      affiliate_url,
      session_id,
      referrer,
      user_agent,
    } = body;

    if (!event_type) {
      return NextResponse.json({ error: "event_type required" }, { status: 400 });
    }

    const { error } = await supabase.from("events").insert({
      event_type,
      page_path: page_path || null,
      product_id: product_id || null,
      product_title: product_title || null,
      product_category: product_category || null,
      product_source: product_source || null,
      product_price: product_price || null,
      affiliate_url: affiliate_url || null,
      session_id: session_id || null,
      referrer: referrer || null,
      user_agent: user_agent || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to track" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Track API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
