import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

function generateQuoteNumber(): string {
  const date = new Date()
  const prefix = "DV"
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${datePart}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      company_name,
      contact_name,
      contact_email,
      contact_phone,
      ice_number,
      city,
      project_type,
      notes,
      items,
    } = body

    if (!company_name) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const quoteNumber = generateQuoteNumber()

    const { data, error } = await supabase
      .from("quotes")
      .insert({
        quote_number: quoteNumber,
        company_name,
        contact_name: contact_name || null,
        contact_email: contact_email || null,
        contact_phone: contact_phone || null,
        ice_number: ice_number || null,
        city: city || null,
        project_type: project_type || null,
        notes: notes || null,
        items: items || [],
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Quote creation error:", error)
      return NextResponse.json(
        { error: "Failed to create quote" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      quote_number: quoteNumber,
      quote_id: data.id,
    })
  } catch (error) {
    console.error("Quote error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
