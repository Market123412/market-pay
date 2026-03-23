import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Produtos | MarketPay",
  description:
    "Busque e compare preços de milhares de produtos no Mercado Livre, Amazon e Shopee. Encontre as melhores ofertas com frete grátis.",
  alternates: { canonical: "https://marketpaycommerce.com.br/busca" },
  openGraph: {
    title: "Buscar Produtos | MarketPay",
    description:
      "Busque e compare preços de milhares de produtos no Mercado Livre, Amazon e Shopee.",
    url: "https://marketpaycommerce.com.br/busca",
    siteName: "MarketPay",
    type: "website",
    locale: "pt_BR",
  },
};

export default function BuscaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
