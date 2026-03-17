"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface AdBannerProps {
  variant?: "horizontal" | "sidebar";
  adSlot?: string;
}

export default function AdBanner({ variant = "horizontal", adSlot }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (adsenseId && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense not loaded yet
      }
    }
  }, [adsenseId]);

  // Se o AdSense não está configurado, não mostrar nada ao visitante
  if (!adsenseId) {
    return null;
  }

  return (
    <ins
      ref={adRef}
      className="adsbygoogle block"
      style={{
        display: "block",
        minHeight: variant === "horizontal" ? "90px" : "250px",
      }}
      data-ad-client={adsenseId}
      data-ad-slot={adSlot || ""}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
