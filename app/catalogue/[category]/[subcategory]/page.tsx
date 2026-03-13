"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { ProductGrid } from "@/components/product/ProductGrid"
import type { Product } from "@/types"

export default function SubcategoryPage() {
  const params = useParams()
  const { category, subcategory } = params as { category: string; subcategory: string }
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/products?category=${category}&subcategory=${subcategory}&limit=48`
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
  }, [category, subcategory])

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6 capitalize">
          {subcategory.replace(/-/g, " ")}
        </h1>
        <ProductGrid products={products} loading={loading} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
