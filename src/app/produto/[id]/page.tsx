import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProducts } from "@/data/products";
import { sourceLabels, formatPrice, getAffiliateUrl } from "@/lib/affiliate";
import ProductRedirect from "./ProductRedirect";

const SITE_URL = "https://marketpaycommerce.com.br";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// No static params — all product pages are on-demand redirects
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);
  if (!product) return { title: "Produto não encontrado" };

  const title = `${product.title} | MarketPay`;
  const description = `${product.title} por ${formatPrice(product.price)}${product.discount ? ` com ${product.discount}% OFF` : ""}. Encontre no ${sourceLabels[product.source]} com o melhor preço.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "MarketPay",
      images: [{ url: product.image, width: 600, height: 600, alt: product.title }],
      type: "website",
      locale: "pt_BR",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const affiliateLink = getAffiliateUrl(product.affiliateUrl, product.id, product.title);

  return (
    <ProductRedirect
      affiliateUrl={affiliateLink}
      productId={product.id}
      productTitle={product.title}
      productCategory={product.category}
      productSource={product.source}
      productPrice={product.price}
      sourceLabel={sourceLabels[product.source]}
    />
  );
}
