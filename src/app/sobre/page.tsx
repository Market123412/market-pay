import { ShoppingBag, Users, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Sobre nós — MarketPay",
  description: "Conheça o MarketPay, a plataforma que reúne as melhores ofertas da internet em um só lugar. Compare preços no Mercado Livre, Amazon e Shopee.",
  alternates: { canonical: "https://marketpaycommerce.com.br/sobre" },
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900">Sobre o MarketPay</h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        O <strong>MarketPay</strong> é uma plataforma de comparação de preços e ofertas que reúne
        os melhores produtos dos maiores e-commerces do Brasil — Mercado Livre, Amazon e Shopee —
        em um só lugar, facilitando sua vida na hora de economizar.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
            <ShoppingBag className="text-emerald-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Como funciona</h3>
          <p className="mt-2 text-sm text-gray-600">
            Reunimos ofertas de múltiplos sites parceiros usando seus programas de afiliados oficiais.
            Ao clicar em &ldquo;Comprar&rdquo;, você é redirecionado para o site original onde a compra
            é realizada com toda a segurança da plataforma parceira.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Users className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Para quem é</h3>
          <p className="mt-2 text-sm text-gray-600">
            Para qualquer pessoa que deseja encontrar o melhor preço sem precisar pesquisar
            em vários sites diferentes. Comparamos preços, mostramos avaliações reais e indicamos
            onde está a melhor oferta.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
            <TrendingUp className="text-yellow-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Nosso modelo</h3>
          <p className="mt-2 text-sm text-gray-600">
            Somos um site de afiliados. Quando você compra um produto através do nosso link,
            recebemos uma pequena comissão do site parceiro — sem nenhum custo adicional para você.
            Isso nos permite manter o serviço gratuito.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
            <Shield className="text-red-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Segurança</h3>
          <p className="mt-2 text-sm text-gray-600">
            Não processamos pagamentos nem armazenamos dados de cartão. Toda a transação acontece
            diretamente no site oficial do parceiro (Mercado Livre, Amazon ou Shopee), com toda a
            proteção que eles oferecem.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-emerald-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-emerald-800">Pronto para economizar?</h2>
        <p className="mt-2 text-emerald-700">
          Explore nossas ofertas e encontre os melhores preços da internet.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Ver Ofertas
        </Link>
      </div>
    </div>
  );
}
