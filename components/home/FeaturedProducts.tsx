"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product/ProductCard"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/types"

const TABS = [
  { label: "Populaires", sort: "stock_qty", icon: "🔥" },
  { label: "Nouveautés", sort: "created_at", icon: "✨" },
  { label: "Meilleur prix", sort: "price_ttc", icon: "💰" },
]

interface FeaturedProductsProps {
  title: string
  limit?: number
  sortBy?: string
}

export function FeaturedProducts({
  title,
  limit = 16,
}: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const sort = TABS[activeTab].sort
        const res = await fetch(
          `/api/products?limit=${limit}&sort=${sort}&in_stock=true&featured=true`
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
  }, [limit, activeTab])

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0B1F3A]">
            {title}
          </h2>
          <p className="text-[#6B7A99] text-sm mt-1">
            Produits en stock, prêts à être livrés
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#F7F9FC] rounded-xl p-1">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === i
                  ? "bg-white text-[#0B1F3A] shadow-sm"
                  : "text-[#6B7A99] hover:text-[#0B1F3A]"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-[14px] border border-[#E2E8F4] animate-pulse h-[360px]"
            />
          ))}
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 8} />
          ))}
        </motion.div>
      )}

      {/* See all button */}
      <div className="text-center mt-10">
        <Link
          href="/catalogue"
          className="group inline-flex items-center gap-2 bg-[#0B1F3A] hover:bg-[#112D54] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg"
        >
          Voir tout le catalogue
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
