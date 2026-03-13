import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase-server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()

  let productUrls: MetadataRoute.Sitemap = []
  let categoryUrls: MetadataRoute.Sitemap = []

  try {
    const [{ data: products }, { data: categories }] = await Promise.all([
      supabase
        .from("products")
        .select("slug,updated_at")
        .eq("is_published", true),
      supabase.from("categories").select("slug").eq("is_active", true),
    ])

    productUrls = (products ?? []).map((p) => ({
      url: `https://novatech.ma/produit/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))

    categoryUrls = (categories ?? []).map((c) => ({
      url: `https://novatech.ma/catalogue/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }))
  } catch {
    // Supabase not configured yet, return static URLs
  }

  return [
    {
      url: "https://novatech.ma",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://novatech.ma/catalogue",
      lastModified: new Date(),
      priority: 0.95,
    },
    {
      url: "https://novatech.ma/devis",
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: "https://novatech.ma/marques/dell",
      lastModified: new Date(),
      priority: 0.85,
    },
    {
      url: "https://novatech.ma/marques/jabra",
      lastModified: new Date(),
      priority: 0.8,
    },
    ...categoryUrls,
    ...productUrls,
  ]
}
