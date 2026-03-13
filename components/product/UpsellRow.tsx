"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard"
import type { Product } from "@/types"

interface UpsellRowProps {
  category: string
  currentId: number
}

export function UpsellRow({ category, currentId }: UpsellRowProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/products?category=${category}&limit=4&exclude=${currentId}`
        )
        if (res.ok) {
          const data = await res.json()
          setProducts(data.products || [])
        }
      } catch {
        // silently fail
      }
    }
    load()
  }, [category, currentId])

  if (!products.length) return null

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">
        Produits similaires
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
