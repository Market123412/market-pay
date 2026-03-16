"use client";

import { useEffect, useRef } from "react";
import { Megaphone } from "lucide-react";

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
  const isAdsenseConfigured = adsenseId && adSlot;

  useEffect(() => {
    if (isAdsenseConfigured && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense not loaded yet
      }
    }
  }, [isAdsenseConfigured]);

  if (!isAdsenseConfigured) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 ${
          variant === "horizontal" ? "h-24 w-full" : "h-64 w-full"
        }`}
      >
        <div className="flex flex-col items-center gap-1">
          <Megaphone size={24} />
          <span className="text-xs font-medium">Espaço Publicitário</span>
          <span className="text-[10px]">Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID no .env.local</span>
        </div>
      </div>
    );
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
      data-ad-slot={adSlot}
      data-ad-format={variant === "horizontal" ? "horizontal" : "rectangle"}
      data-full-width-responsive="true"
    />
  );
}
