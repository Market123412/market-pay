import { NextRequest, NextResponse } from "next/server";
import { searchAllProducts } from "@/lib/api/unified";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  try {
    const products = await searchAllProducts(query, limit);
    return NextResponse.json({ products, total: products.length });
  } catch (error) {
    console.error("[API] Erro na busca:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos", products: [] },
      { status: 500 }
    );
  }
}
