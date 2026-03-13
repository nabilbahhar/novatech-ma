"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { ProductGrid } from "@/components/product/ProductGrid"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import type { Product } from "@/types"

const CATEGORY_NAMES: Record<string, string> = {
  ordinateurs: "Ordinateurs & PC",
  ecrans: "Écrans & Affichage",
  accessoires: "Accessoires",
  audio: "Casques & Audio Pro",
  bagagerie: "Bagagerie & Protection",
  reseau: "Réseau & Connectivité",
  impression: "Impression",
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products?category=${category}&limit=48`)
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
  }, [category])

  const categoryName = CATEGORY_NAMES[category] || category

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://novatech.ma" },
          { name: "Catalogue", url: "https://novatech.ma/catalogue" },
          { name: categoryName, url: `https://novatech.ma/catalogue/${category}` },
        ]}
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
          {categoryName}
        </h1>
        <ProductGrid products={products} loading={loading} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
