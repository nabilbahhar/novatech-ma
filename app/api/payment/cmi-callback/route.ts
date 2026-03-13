import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()

    const oid = body.get("oid") as string
    const response = body.get("Response") as string
    const procReturnCode = body.get("ProcReturnCode") as string
    // Verify CMI hash
    const storeKey = process.env.CMI_STORE_KEY
    if (!storeKey) {
      return NextResponse.json(
        { error: "CMI not configured" },
        { status: 500 }
      )
    }

    // Check payment status
    if (response === "Approved" && procReturnCode === "00") {
      const supabase = createClient()

      await supabase
        .from("orders")
        .update({
          status: "confirmed",
          payment_method: "cmi",
          updated_at: new Date().toISOString(),
        })
        .eq("order_number", oid)

      return NextResponse.json({ status: "OK" })
    }

    return NextResponse.json({ status: "FAILED" })
  } catch (error) {
    console.error("CMI callback error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
