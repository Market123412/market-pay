import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade — MarketPay",
  description: "Política de privacidade do MarketPay. Saiba como tratamos seus dados.",
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900">Política de Privacidade</h1>
      <p className="mt-2 text-sm text-gray-500">Última atualização: Março de 2026</p>

      <div className="mt-8 space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Informações que coletamos</h2>
          <p className="mt-2">
            O MarketPay é um site de comparação de preços e afiliados. Coletamos o mínimo
            de informações necessárias para oferecer nosso serviço:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Dados de navegação anônimos (páginas visitadas, tempo no site)</li>
            <li>Cookies de terceiros para anúncios (Google AdSense)</li>
            <li>Cookies de afiliados para rastreamento de comissões</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">2. Como usamos suas informações</h2>
          <p className="mt-2">
            Utilizamos as informações coletadas para:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Melhorar a experiência de navegação no site</li>
            <li>Exibir anúncios relevantes através do Google AdSense</li>
            <li>Rastrear comissões de vendas realizadas através de links de afiliados</li>
            <li>Gerar estatísticas anônimas de uso do site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">3. Cookies e tecnologias de rastreamento</h2>
          <p className="mt-2">
            Utilizamos cookies para funcionalidades essenciais do site e para serviços de terceiros:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><strong>Google AdSense</strong> — exibição de anúncios personalizados</li>
            <li><strong>Google Analytics</strong> — análise de tráfego (anônimo)</li>
            <li><strong>Cookies de afiliados</strong> — rastreamento de vendas (Mercado Livre, Amazon, Shopee)</li>
          </ul>
          <p className="mt-2">
            Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar
            a funcionalidade do site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">4. Compartilhamento de dados</h2>
          <p className="mt-2">
            <strong>Não vendemos nem compartilhamos seus dados pessoais.</strong> Ao clicar em um
            link de produto, você será redirecionado para o site parceiro (Mercado Livre, Amazon ou
            Shopee), onde a política de privacidade daquele site se aplica.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">5. Segurança</h2>
          <p className="mt-2">
            Não processamos pagamentos nem armazenamos dados financeiros. Todas as transações
            são realizadas diretamente nos sites parceiros, que possuem seus próprios sistemas
            de segurança e proteção ao consumidor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">6. LGPD — Lei Geral de Proteção de Dados</h2>
          <p className="mt-2">
            Em conformidade com a LGPD (Lei nº 13.709/2018), você tem o direito de:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Solicitar acesso aos dados que temos sobre você</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Revogar o consentimento para uso de cookies</li>
            <li>Solicitar a portabilidade de seus dados</li>
          </ul>
          <p className="mt-2">
            Para exercer qualquer um desses direitos, entre em contato conosco através da
            página de <Link href="/contato" className="text-emerald-600 hover:underline">Contato</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">7. Alterações nesta política</h2>
          <p className="mt-2">
            Reservamo-nos o direito de atualizar esta política de privacidade a qualquer momento.
            Recomendamos que você revise esta página periodicamente para se manter informado sobre
            eventuais alterações.
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
