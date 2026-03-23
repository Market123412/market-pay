import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofertas do Dia — Até 90% OFF | MarketPay",
  description:
    "As melhores ofertas e promoções do dia com até 90% de desconto. Compare preços no Mercado Livre, Amazon e Shopee e economize em milhares de produtos.",
  alternates: { canonical: "https://marketpaycommerce.com.br/ofertas" },
  openGraph: {
    title: "Ofertas do Dia — Até 90% OFF | MarketPay",
    description:
      "As melhores ofertas e promoções do dia com até 90% de desconto. Compare preços e economize.",
    url: "https://marketpaycommerce.com.br/ofertas",
    siteName: "MarketPay",
    type: "website",
    locale: "pt_BR",
  },
};

export default function OfertasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
