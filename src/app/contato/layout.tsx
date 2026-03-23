import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | MarketPay",
  description:
    "Entre em contato com a equipe MarketPay. Estamos aqui para ajudar com dúvidas, sugestões e parcerias.",
  alternates: { canonical: "https://marketpaycommerce.com.br/contato" },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
