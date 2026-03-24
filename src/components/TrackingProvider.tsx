"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/tracking";

export default function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    if (pathname !== lastPath.current) {
      lastPath.current = pathname;
      trackPageView(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}
