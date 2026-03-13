"use client"

import { ProductCard } from "./ProductCard"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-[14px] border border-[#E2E8F4] animate-pulse"
          >
            <div className="h-[180px] bg-[#F7F9FC]" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-[#F7F9FC] rounded w-16" />
              <div className="h-4 bg-[#F7F9FC] rounded w-full" />
              <div className="h-3 bg-[#F7F9FC] rounded w-24" />
              <div className="h-6 bg-[#F7F9FC] rounded w-28" />
              <div className="h-9 bg-[#F7F9FC] rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <p className="text-[#6B7A99] text-lg">Aucun produit trouvé</p>
        <p className="text-[#6B7A99] text-sm mt-2">
          Essayez de modifier vos filtres
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 8} />
      ))}
    </div>
  )
}
