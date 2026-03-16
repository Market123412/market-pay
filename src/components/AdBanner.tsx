"use client";

import { Megaphone } from "lucide-react";

interface AdBannerProps {
  variant?: "horizontal" | "sidebar";
}

export default function AdBanner({ variant = "horizontal" }: AdBannerProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 ${
        variant === "horizontal" ? "h-24 w-full" : "h-64 w-full"
      }`}
    >
      <div className="flex flex-col items-center gap-1">
        <Megaphone size={24} />
        <span className="text-xs font-medium">Espaço Publicitário</span>
        <span className="text-[10px]">Google AdSense</span>
      </div>
    </div>
  );
}
