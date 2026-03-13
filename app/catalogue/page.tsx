"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { ProductGrid } from "@/components/product/ProductGrid"
import { ProductFilters } from "@/components/product/ProductFilters"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { Loader2 } from "lucide-react"
import type { Product } from "@/types"

const PAGE_SIZE = 48

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
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const buildParams = useCallback((offset = 0) => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (selectedBrands.length) params.set("brands", selectedBrands.join(","))
    if (selectedCategories.length) params.set("categories", selectedCategories.join(","))
    if (inStockOnly) params.set("in_stock", "true")
    params.set("limit", String(PAGE_SIZE))
    params.set("offset", String(offset))
    return params
  }, [q, selectedBrands, selectedCategories, inStockOnly])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/products?${buildParams(0)}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products || [])
        setTotal(data.total || 0)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [buildParams])

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      const res = await fetch(`/api/products?${buildParams(products.length)}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(prev => [...prev, ...(data.products || [])])
        setTotal(data.total || 0)
      }
    } catch {
      // silently fail
    } finally {
      setLoadingMore(false)
    }
  }

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

  const hasMore = products.length < total

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
            {products.length} sur {total} produit{total !== 1 ? "s" : ""}
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

          <div>
            <ProductGrid products={products} loading={loading} />

            {/* Load more button */}
            {!loading && hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 px-8 py-3 bg-[#0B1F3A] hover:bg-[#112D54] text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>Afficher plus ({total - products.length} restants)</>
                  )}
                </button>
              </div>
            )}

            {/* All loaded message */}
            {!loading && !hasMore && products.length > 0 && (
              <p className="text-center text-sm text-[#6B7A99] mt-8">
                Tous les {total} produits sont affichés
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
