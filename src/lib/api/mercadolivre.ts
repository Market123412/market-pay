import axios from "axios";

const ML_APP_ID = process.env.MERCADOLIVRE_APP_ID || "";
const ML_ACCESS_TOKEN = process.env.MERCADOLIVRE_ACCESS_TOKEN || "";
const ML_BASE_URL = "https://api.mercadolibre.com";

export interface MercadoLivreProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  url: string;
  rating?: number;
  reviewCount?: number;
  freeShipping: boolean;
  seller: string;
  condition: string;
  features: string[];
}

export async function searchMercadoLivreProducts(
  query: string,
  category?: string,
  limit: number = 10
): Promise<MercadoLivreProduct[]> {
  if (!ML_APP_ID && !ML_ACCESS_TOKEN) {
    console.warn("[ML API] Chaves não configuradas. Usando dados mock.");
    return [];
  }

  try {
    const params: Record<string, string | number> = {
      q: query,
      limit,
      site_id: "MLB",
    };

    if (category) {
      params.category = category;
    }

    const headers: Record<string, string> = {};
    if (ML_ACCESS_TOKEN) {
      headers.Authorization = `Bearer ${ML_ACCESS_TOKEN}`;
    }

    const response = await axios.get(`${ML_BASE_URL}/sites/MLB/search`, {
      params,
      headers,
      timeout: 10000,
    });

    const results = response.data?.results || [];

    return results.map((item: Record<string, unknown>) => {
      const shipping = item.shipping as Record<string, unknown> | undefined;
      const seller = item.seller as Record<string, unknown> | undefined;
      const prices = item.prices as Record<string, unknown> | undefined;
      const pricesList = (prices?.prices as Array<Record<string, unknown>>) || [];
      const originalPriceEntry = pricesList.find(
        (p: Record<string, unknown>) => p.type === "list"
      );

      return {
        id: item.id as string,
        title: item.title as string,
        price: item.price as number,
        originalPrice: (originalPriceEntry?.amount as number) || undefined,
        image: (item.thumbnail as string)?.replace("http://", "https://").replace("-I.jpg", "-O.jpg") || "",
        images: [],
        url: item.permalink as string,
        freeShipping: (shipping?.free_shipping as boolean) || false,
        seller: (seller?.nickname as string) || "Vendedor",
        condition: item.condition as string,
        features: ((item.attributes as Array<Record<string, unknown>>) || [])
          .slice(0, 5)
          .map((attr) => `${attr.name}: ${attr.value_name}`),
      };
    });
  } catch (error) {
    console.error("[ML API] Erro ao buscar produtos:", error);
    return [];
  }
}

export async function getMercadoLivreProductDetails(
  productId: string
): Promise<MercadoLivreProduct | null> {
  if (!ML_APP_ID && !ML_ACCESS_TOKEN) {
    return null;
  }

  try {
    const headers: Record<string, string> = {};
    if (ML_ACCESS_TOKEN) {
      headers.Authorization = `Bearer ${ML_ACCESS_TOKEN}`;
    }

    const [itemRes, descRes] = await Promise.all([
      axios.get(`${ML_BASE_URL}/items/${productId}`, { headers, timeout: 10000 }),
      axios.get(`${ML_BASE_URL}/items/${productId}/description`, { headers, timeout: 10000 }).catch(() => null),
    ]);

    const item = itemRes.data;
    const shipping = item.shipping || {};
    const pictures = item.pictures || [];

    return {
      id: item.id,
      title: item.title,
      price: item.price,
      originalPrice: item.original_price || undefined,
      image: pictures[0]?.secure_url || item.thumbnail?.replace("http://", "https://") || "",
      images: pictures.map((p: Record<string, string>) => p.secure_url || p.url),
      url: item.permalink,
      freeShipping: shipping.free_shipping || false,
      seller: item.seller_id?.toString() || "Vendedor",
      condition: item.condition,
      features: (item.attributes || [])
        .slice(0, 10)
        .map((attr: Record<string, string>) => `${attr.name}: ${attr.value_name}`),
    };
  } catch (error) {
    console.error("[ML API] Erro ao buscar detalhes:", error);
    return null;
  }
}

export async function getMercadoLivreReviews(
  productId: string
): Promise<{ rating: number; count: number; reviews: Array<{ author: string; rating: number; comment: string; date: string }> }> {
  if (!ML_ACCESS_TOKEN) {
    return { rating: 0, count: 0, reviews: [] };
  }

  try {
    const response = await axios.get(
      `${ML_BASE_URL}/reviews/item/${productId}`,
      {
        headers: { Authorization: `Bearer ${ML_ACCESS_TOKEN}` },
        timeout: 10000,
      }
    );

    const data = response.data;
    const reviews = (data.reviews || []).map((r: Record<string, unknown>) => ({
      author: (r.reviewer as Record<string, string>)?.nickname || "Anônimo",
      rating: r.rate as number,
      comment: (r.content as string) || "",
      date: (r.date_created as string)?.slice(0, 10) || "",
    }));

    return {
      rating: data.rating_average || 0,
      count: data.paging?.total || 0,
      reviews,
    };
  } catch (error) {
    console.error("[ML API] Erro ao buscar reviews:", error);
    return { rating: 0, count: 0, reviews: [] };
  }
}
