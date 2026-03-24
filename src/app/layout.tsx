import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import TrackingProvider from "@/components/TrackingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marketpaycommerce.com.br"),
  title: {
    default: "MarketPay — Melhores ofertas da internet em um só lugar",
    template: "%s | MarketPay",
  },
  description:
    "Compare preços e encontre as melhores ofertas do Mercado Livre, Amazon e Shopee. Economize comprando com segurança nos maiores sites do Brasil.",
  keywords: [
    "ofertas", "comparar preços", "mercado livre", "amazon", "shopee",
    "cupons", "promoções", "desconto", "frete grátis", "menor preço",
    "compras online", "ecommerce brasil",
  ],
  alternates: { canonical: "https://marketpaycommerce.com.br" },
  openGraph: {
    title: "MarketPay — Melhores ofertas da internet em um só lugar",
    description: "Compare preços no Mercado Livre, Amazon e Shopee. Milhares de produtos com até 90% OFF e frete grátis.",
    url: "https://marketpaycommerce.com.br",
    siteName: "MarketPay",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarketPay — Melhores ofertas da internet",
    description: "Compare preços no Mercado Livre, Amazon e Shopee. Até 90% OFF.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1277992004294468');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1277992004294468&ev=PageView&noscript=1"
          />
        </noscript>
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TrackingProvider>
          <LayoutShell>{children}</LayoutShell>
        </TrackingProvider>
      </body>
    </html>
  );
}
