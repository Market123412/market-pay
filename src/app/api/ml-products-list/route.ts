import { NextResponse } from "next/server";
import mlRaw from "@/data/ml-products.json";

interface MLRawProduct {
  mlProductId: string;
  title: string;
  price: number;
  image: string;
  permalink: string;
}

const raw = mlRaw as MLRawProduct[];

export async function GET() {
  const products = raw.map((p) => ({
    mlProductId: p.mlProductId,
    title: p.title,
    price: p.price,
    image: p.image,
    permalink: p.permalink,
  }));

  return NextResponse.json({ products });
}
