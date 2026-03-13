import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_id, email, phone } = body

    if (!product_id || (!email && !phone)) {
      return NextResponse.json(
        { error: "Product ID and email or phone required" },
        { status: 400 }
      )
    }

    const supabase = createClient()

    const { error } = await supabase.from("stock_alerts").insert({
      product_id,
      email: email || null,
      phone: phone || null,
    })

    if (error) {
      console.error("Stock alert error:", error)
      return NextResponse.json(
        { error: "Failed to create alert" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Stock alert error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
