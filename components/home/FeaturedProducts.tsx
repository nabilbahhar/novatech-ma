"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product/ProductCard"
import type { Product } from "@/types"

interface FeaturedProductsProps {
  title: string
  limit?: number
  sortBy?: string
}

export function FeaturedProducts({
  title,
  limit = 12,
  sortBy = "stock_qty",
}: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/products?limit=${limit}&sort=${sortBy}&in_stock=true`
        )
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
  }, [limit, sortBy])

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
        {title}
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-[14px] border border-[#E2E8F4] animate-pulse h-[320px]"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 8} />
          ))}
        </div>
      )}
    </section>
  )
}
