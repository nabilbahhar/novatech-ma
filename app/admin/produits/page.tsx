"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/pricing"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products?limit=100`)
        if (res.ok) {
          const data = await res.json()
          setProducts(data.products || [])
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = search
    ? products.filter(
        (p) =>
          p.title_commercial.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase())
      )
    : products

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-[#0B1F3A]">
          Produits ({filtered.length})
        </h1>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A99]" />
        <input
          type="text"
          placeholder="Rechercher par nom, SKU, marque..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
        />
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F4] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F7F9FC] text-left">
              <th className="px-4 py-3 font-semibold text-[#6B7A99]">SKU</th>
              <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                Produit
              </th>
              <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                Marque
              </th>
              <th className="px-4 py-3 font-semibold text-[#6B7A99]">Stock</th>
              <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                Prix TTC
              </th>
              <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#6B7A99]">
                  Chargement...
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-[#E2E8F4] hover:bg-[#F7F9FC]"
                >
                  <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                  <td className="px-4 py-3 font-medium text-[#0B1F3A] max-w-xs truncate">
                    {p.title_commercial}
                  </td>
                  <td className="px-4 py-3 text-[#2354A4] font-semibold text-xs uppercase">
                    {p.brand}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-bold ${
                        p.stock_qty > 10
                          ? "text-[#00B87A]"
                          : p.stock_qty > 0
                            ? "text-[#F0A500]"
                            : "text-[#D42B3A]"
                      }`}
                    >
                      {p.stock_qty}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-[#D42B3A]">
                    {p.price_ttc ? formatPrice(p.price_ttc) : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === "published"
                          ? "bg-[#00B87A]/10 text-[#00B87A]"
                          : "bg-[#6B7A99]/10 text-[#6B7A99]"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
