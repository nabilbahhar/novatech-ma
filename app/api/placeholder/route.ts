import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text") || "Product"
  const brand = searchParams.get("brand") || ""

  const displayText = brand || text.slice(0, 20)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#F7F9FC"/>
    <text x="300" y="280" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="#2354A4">${escapeXml(displayText)}</text>
    <text x="300" y="330" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#6B7A99">${escapeXml(text.slice(0, 50))}</text>
  </svg>`

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
