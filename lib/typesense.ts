import Typesense from "typesense"

export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || "localhost",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY || "",
  connectionTimeoutSeconds: 5,
})

export const typesenseSearchClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || "localhost",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY || "",
  connectionTimeoutSeconds: 5,
})

export async function searchProducts(query: string, filters?: string, page = 1, perPage = 24) {
  try {
    const result = await typesenseSearchClient.collections("products").documents().search({
      q: query,
      query_by: "title_commercial,brand,sku,description_short",
      filter_by: filters || "",
      sort_by: "stock_qty:desc",
      page,
      per_page: perPage,
      facet_by: "brand,category,subcategory,availability_status",
      num_typos: 2,
    })
    return result
  } catch (error) {
    console.error("Typesense search error:", error)
    return null
  }
}
