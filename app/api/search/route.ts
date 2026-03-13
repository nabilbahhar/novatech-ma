import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")
  const limit = parseInt(searchParams.get("limit") || "6")

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [] })
  }

  const supabase = createClient()

  // Try Supabase text search first
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .or(
      `title_commercial.ilike.%${q}%,brand.ilike.%${q}%,sku.ilike.%${q}%`
    )
    .order("stock_qty", { ascending: false })
    .limit(limit)

  if (error) {
    return NextResponse.json({ products: [] })
  }

  return NextResponse.json({ products: data || [] })
}
