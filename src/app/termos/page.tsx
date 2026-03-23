import Link from "next/link";

export const metadata = {
  title: "Termos de Uso — MarketPay",
  description: "Termos de uso do MarketPay. Leia antes de utilizar nosso serviço de comparação de preços.",
  alternates: { canonical: "https://marketpaycommerce.com.br/termos" },
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900">Termos de Uso</h1>
      <p className="mt-2 text-sm text-gray-500">Última atualização: Março de 2026</p>

      <div className="mt-8 space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Aceitação dos Termos</h2>
          <p className="mt-2">
            Ao acessar e utilizar o MarketPay, você concorda com estes Termos de Uso.
            Se não concordar com qualquer parte destes termos, não utilize o site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">2. Descrição do Serviço</h2>
          <p className="mt-2">
            O MarketPay é uma plataforma de comparação de preços e programa de afiliados que
            exibe produtos de sites parceiros (Mercado Livre, Amazon e Shopee). O MarketPay
            <strong> não vende produtos diretamente</strong>. Ao clicar em um produto, você será
            redirecionado para o site do parceiro onde a compra será realizada.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">3. Preços e Disponibilidade</h2>
          <p className="mt-2">
            Os preços exibidos no MarketPay são atualizados periodicamente, mas podem sofrer
            alterações nos sites parceiros a qualquer momento. O MarketPay não garante a
            disponibilidade, preço ou condições dos produtos exibidos. Sempre verifique o preço
            final no site do parceiro antes de concluir a compra.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">4. Links de Afiliados</h2>
          <p className="mt-2">
            Os links de produtos no MarketPay contêm identificadores de afiliados. Quando você
            realiza uma compra através desses links, o MarketPay pode receber uma comissão do
            site parceiro, <strong>sem nenhum custo adicional para você</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">5. Responsabilidade</h2>
          <p className="mt-2">
            O MarketPay atua exclusivamente como intermediário de informações. Não somos
            responsáveis por:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Qualidade, defeitos ou problemas com os produtos adquiridos</li>
            <li>Entregas, prazos ou logística dos sites parceiros</li>
            <li>Políticas de devolução e reembolso dos sites parceiros</li>
            <li>Alterações de preço ou disponibilidade após a exibição no MarketPay</li>
          </ul>
          <p className="mt-2">
            Qualquer problema com a compra deve ser resolvido diretamente com o site onde a
            transação foi realizada.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">6. Propriedade Intelectual</h2>
          <p className="mt-2">
            O design, código e conteúdo original do MarketPay são protegidos por direitos autorais.
            As imagens, descrições e informações dos produtos pertencem aos seus respectivos donos
            e sites parceiros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">7. Modificações</h2>
          <p className="mt-2">
            O MarketPay reserva-se o direito de modificar estes Termos de Uso a qualquer momento.
            Alterações significativas serão comunicadas no site. O uso continuado do serviço após
            alterações constitui aceitação dos novos termos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">8. Contato</h2>
          <p className="mt-2">
            Para dúvidas sobre estes termos, entre em contato através da página de{" "}
            <Link href="/contato" className="text-emerald-600 hover:underline">Contato</Link>.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
