import Link from "next/link";
import { ShoppingBag, Mail, Shield, Truck, RotateCcw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust bar */}
      <div className="border-b border-gray-800">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <Shield className="shrink-0 text-emerald-400" size={28} />
            <div>
              <p className="text-sm font-semibold text-white">Compra Segura</p>
              <p className="text-xs text-gray-400">Sites oficiais verificados</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="shrink-0 text-emerald-400" size={28} />
            <div>
              <p className="text-sm font-semibold text-white">Frete Grátis</p>
              <p className="text-xs text-gray-400">Em milhares de produtos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="shrink-0 text-emerald-400" size={28} />
            <div>
              <p className="text-sm font-semibold text-white">Devolução Fácil</p>
              <p className="text-xs text-gray-400">Direto com o vendedor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="shrink-0 text-emerald-400" size={28} />
            <div>
              <p className="text-sm font-semibold text-white">Suporte</p>
              <p className="text-xs text-gray-400">Atendimento rápido</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Market</span>
                <span className="text-lg font-bold text-emerald-400">Pay</span>
              </div>
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Os melhores produtos da internet em um só lugar. Compare preços e compre com segurança nos maiores sites do Brasil.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categoria/eletronicos" className="hover:text-emerald-400">Eletrônicos</Link></li>
              <li><Link href="/categoria/moda" className="hover:text-emerald-400">Moda</Link></li>
              <li><Link href="/categoria/casa-decoracao" className="hover:text-emerald-400">Casa & Decoração</Link></li>
              <li><Link href="/categoria/esportes" className="hover:text-emerald-400">Esportes</Link></li>
              <li><Link href="/categoria/games" className="hover:text-emerald-400">Games</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Parceiros</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://mercadolivre.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Mercado Livre</a></li>
              <li><a href="https://amazon.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Amazon Brasil</a></li>
              <li><a href="https://shopee.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Shopee</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-emerald-400">Sobre nós</Link></li>
              <li><Link href="#" className="hover:text-emerald-400">Política de Privacidade</Link></li>
              <li><Link href="#" className="hover:text-emerald-400">Termos de Uso</Link></li>
              <li><Link href="#" className="hover:text-emerald-400">Contato</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-4 py-4">
        <div className="mx-auto max-w-7xl text-center text-xs text-gray-500">
          <p>© 2026 MarketPay. Todos os direitos reservados.</p>
          <p className="mt-1">
            MarketPay é um site de afiliados. Os produtos são vendidos e entregues pelos sites parceiros.
          </p>
        </div>
      </div>
    </footer>
  );
}
