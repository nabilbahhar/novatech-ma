import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

function generateOrderNumber(): string {
  const date = new Date()
  const prefix = "NT"
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${datePart}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customer_name,
      customer_phone,
      customer_email,
      customer_city,
      delivery_address,
      payment_method,
      notes,
      is_b2b,
      company_name,
      ice_number,
      items,
      subtotal_ht,
      total_ttc,
    } = body

    if (!customer_name || !customer_phone || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const orderNumber = generateOrderNumber()

    const deliveryZone = ["Casablanca", "casablanca"].includes(
      customer_city?.toLowerCase()
    )
      ? "casablanca"
      : ["Rabat", "rabat"].includes(customer_city?.toLowerCase())
        ? "rabat"
        : ["Tanger", "tanger"].includes(customer_city?.toLowerCase())
          ? "tanger"
          : "other"

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name,
        customer_phone,
        customer_email: customer_email || null,
        customer_city,
        delivery_address,
        delivery_zone: deliveryZone,
        payment_method: payment_method || "cash_on_delivery",
        notes: notes || null,
        is_b2b: is_b2b || false,
        company_name: company_name || null,
        ice_number: ice_number || null,
        items,
        items_count: items.length,
        subtotal_ht,
        tva_amount: total_ttc - subtotal_ht,
        total_ttc,
        status: "pending",
        source: "website",
      })
      .select()
      .single()

    if (error) {
      console.error("Order creation error:", error)
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      order_number: orderNumber,
      order_id: data.id,
    })
  } catch (error) {
    console.error("Order error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
