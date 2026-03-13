"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { ProductGrid } from "@/components/product/ProductGrid"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { Loader2 } from "lucide-react"
import type { Product } from "@/types"

const PAGE_SIZE = 48

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
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products?category=${category}&limit=${PAGE_SIZE}&offset=0`)
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
    }
    load()
  }, [category])

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      const res = await fetch(`/api/products?category=${category}&limit=${PAGE_SIZE}&offset=${products.length}`)
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

  const categoryName = CATEGORY_NAMES[category] || category
  const hasMore = products.length < total

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-[#0B1F3A]">
            {categoryName}
          </h1>
          <span className="text-sm text-[#6B7A99]">
            {products.length} sur {total} produit{total !== 1 ? "s" : ""}
          </span>
        </div>

        <ProductGrid products={products} loading={loading} />

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

        {!loading && !hasMore && products.length > 0 && (
          <p className="text-center text-sm text-[#6B7A99] mt-8">
            Tous les {total} produits sont affichés
          </p>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
