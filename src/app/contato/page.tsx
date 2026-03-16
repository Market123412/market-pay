"use client";

import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900">Contato</h1>
      <p className="mt-4 text-lg text-gray-600">
        Tem alguma dúvida, sugestão ou problema? Entre em contato conosco.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <Mail className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">E-mail</p>
                <p className="text-sm text-gray-500">contato@marketpay.com.br</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <MessageSquare className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Tempo de resposta</p>
                <p className="text-sm text-gray-500">Até 48 horas úteis</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <p className="text-sm font-semibold text-amber-800">Importante</p>
            <p className="mt-1 text-sm text-amber-700">
              O MarketPay é um site de comparação de preços. Para problemas com pedidos,
              entregas ou devoluções, entre em contato diretamente com o site onde a compra
              foi realizada (Mercado Livre, Amazon ou Shopee).
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Send className="text-emerald-600" size={28} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Mensagem enviada!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Obrigado pelo contato. Responderemos o mais rápido possível.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                  Assunto
                </label>
                <select
                  id="subject"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida sobre o site</option>
                  <option value="sugestao">Sugestão de melhoria</option>
                  <option value="parceria">Proposta de parceria</option>
                  <option value="bug">Reportar um problema</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                <Send size={16} />
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
