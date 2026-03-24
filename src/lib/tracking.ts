type EventType = "page_view" | "product_click" | "affiliate_click";

interface TrackEvent {
  event_type: EventType;
  page_path?: string;
  product_id?: string;
  product_title?: string;
  product_category?: string;
  product_source?: string;
  product_price?: number;
  affiliate_url?: string;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("mp_session");
  if (!sid) {
    sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("mp_session", sid);
  }
  return sid;
}

export async function trackEvent(event: TrackEvent): Promise<void> {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...event,
        page_path: event.page_path || window.location.pathname,
        session_id: getSessionId(),
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // silently fail — don't break user experience
  }
}

export function trackPageView(path?: string): void {
  trackEvent({ event_type: "page_view", page_path: path });
}

export function trackProductClick(product: {
  id: string;
  title: string;
  category: string;
  source: string;
  price: number;
}): void {
  trackEvent({
    event_type: "product_click",
    product_id: product.id,
    product_title: product.title,
    product_category: product.category,
    product_source: product.source,
    product_price: product.price,
  });
}

export function trackAffiliateClick(product: {
  id: string;
  title: string;
  category: string;
  source: string;
  price: number;
  affiliateUrl: string;
}): void {
  trackEvent({
    event_type: "affiliate_click",
    product_id: product.id,
    product_title: product.title,
    product_category: product.category,
    product_source: product.source,
    product_price: product.price,
    affiliate_url: product.affiliateUrl,
  });
}
