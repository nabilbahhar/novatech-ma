"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { ProductGrid } from "@/components/product/ProductGrid"
import { ProductFilters } from "@/components/product/ProductFilters"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import type { Product } from "@/types"

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F9FC]" />}>
      <CatalogueContent />
    </Suspense>
  )
}

function CatalogueContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (selectedBrands.length) params.set("brands", selectedBrands.join(","))
    if (selectedCategories.length) params.set("categories", selectedCategories.join(","))
    if (inStockOnly) params.set("in_stock", "true")
    params.set("limit", "48")

    try {
      const res = await fetch(`/api/products?${params}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products || [])
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [q, selectedBrands, selectedCategories, inStockOnly])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const brands = [
    { value: "Dell", label: "Dell" },
    { value: "Jabra", label: "Jabra" },
    { value: "Lenovo", label: "Lenovo" },
    { value: "Cisco", label: "Cisco" },
    { value: "Philips", label: "Philips" },
    { value: "Poly", label: "Poly" },
    { value: "HP", label: "HP" },
    { value: "Canon", label: "Canon" },
  ]

  const categories = [
    { value: "ordinateurs", label: "Ordinateurs" },
    { value: "ecrans", label: "Écrans" },
    { value: "accessoires", label: "Accessoires" },
    { value: "audio", label: "Audio" },
    { value: "bagagerie", label: "Bagagerie" },
    { value: "reseau", label: "Réseau" },
    { value: "impression", label: "Impression" },
  ]

  return (
    <>
      <AnnouncementBar
        items={["Livraison partout au Maroc", "Paiement à la livraison", "Stock vérifié quotidiennement"]}
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-[#0B1F3A]">
            {q ? `Résultats pour "${q}"` : "Tous les produits"}
          </h1>
          <span className="text-sm text-[#6B7A99]">
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          <div className="hidden lg:block">
            <ProductFilters
              brands={brands}
              categories={categories}
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
              priceRange={[0, 100000]}
              maxPrice={100000}
              inStockOnly={inStockOnly}
              onBrandChange={setSelectedBrands}
              onCategoryChange={setSelectedCategories}
              onPriceChange={() => {}}
              onStockChange={setInStockOnly}
              onClear={() => {
                setSelectedBrands([])
                setSelectedCategories([])
                setInStockOnly(false)
              }}
            />
          </div>

          <ProductGrid products={products} loading={loading} />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
