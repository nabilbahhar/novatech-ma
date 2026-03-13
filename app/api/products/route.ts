import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)

  const slug = searchParams.get("slug")
  const category = searchParams.get("category")
  const subcategory = searchParams.get("subcategory")
  const brand = searchParams.get("brand")
  const brands = searchParams.get("brands")
  const categories = searchParams.get("categories")
  const q = searchParams.get("q")
  const inStock = searchParams.get("in_stock")
  const limit = parseInt(searchParams.get("limit") || "24")
  const offset = parseInt(searchParams.get("offset") || "0")
  const sort = searchParams.get("sort") || "stock_qty"
  const exclude = searchParams.get("exclude")
  const hasImage = searchParams.get("has_image")
  const featured = searchParams.get("featured")

  // Single product by slug
  if (slug) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error || !data) {
      return NextResponse.json({ product: null }, { status: 404 })
    }

    return NextResponse.json({ product: data })
  }

  // Product list
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .eq("status", "published")

  if (category) query = query.eq("category", category)
  if (subcategory) query = query.eq("subcategory", subcategory)
  if (brand) query = query.ilike("brand", brand)
  if (brands) {
    const brandList = brands.split(",")
    query = query.in("brand", brandList)
  }
  if (categories) {
    const catList = categories.split(",")
    query = query.in("category", catList)
  }
  if (q) {
    query = query.or(
      `title_commercial.ilike.%${q}%,brand.ilike.%${q}%,sku.ilike.%${q}%`
    )
  }
  if (inStock === "true") query = query.gt("stock_qty", 0)
  if (exclude) query = query.neq("id", parseInt(exclude))
  if (hasImage === "true") query = query.not("image_main", "is", null)
  if (featured === "true") {
    // For featured: only products with images, prioritize computers/monitors/audio
    query = query.not("image_main", "is", null)
    query = query.in("category", ["ordinateurs", "ecrans", "audio", "accessoires"])
  }

  // Sort
  if (sort === "price_asc") {
    query = query.order("price_ttc", { ascending: true })
  } else if (sort === "price_desc") {
    query = query.order("price_ttc", { ascending: false })
  } else {
    query = query.order("stock_qty", { ascending: false })
  }

  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }

  return NextResponse.json({ products: data || [], total: count })
}
