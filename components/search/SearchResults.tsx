"use client"

import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/pricing"
import type { Product } from "@/types"

interface SearchResultsProps {
  results: Product[]
  loading: boolean
  query: string
  onClose: () => void
}

export function SearchResults({
  results,
  loading,
  query,
  onClose,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F4] shadow-card-hover p-4">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-12 h-12 bg-[#F7F9FC] rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-[#F7F9FC] rounded w-3/4" />
                <div className="h-3 bg-[#F7F9FC] rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!results.length) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F4] shadow-card-hover p-4 text-center">
        <p className="text-sm text-[#6B7A99]">
          Aucun résultat pour &quot;{query}&quot;
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F4] shadow-card-hover overflow-hidden">
      {results.map((product) => (
        <Link
          key={product.id}
          href={`/produit/${product.slug}`}
          onClick={onClose}
          className="flex items-center gap-3 p-3 hover:bg-[#F7F9FC] transition-colors border-b border-[#E2E8F4] last:border-b-0"
        >
          <div className="w-12 h-12 bg-white rounded flex-shrink-0 flex items-center justify-center">
            {product.image_main ? (
              <Image
                src={product.image_main}
                alt={product.title_commercial}
                width={48}
                height={48}
                className="object-contain"
              />
            ) : (
              <span className="text-[10px] font-bold text-[#2354A4]">
                {product.brand}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#2354A4] font-bold uppercase">
              {product.brand}
            </p>
            <p className="text-sm font-medium text-[#0B1F3A] truncate">
              {product.title_commercial}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-[#D42B3A]">
              {formatPrice(product.price_ttc)}
            </p>
            {product.stock_qty > 0 && (
              <p className="text-[10px] text-[#00B87A] font-semibold">
                En stock
              </p>
            )}
          </div>
        </Link>
      ))}

      <Link
        href={`/catalogue?q=${encodeURIComponent(query)}`}
        onClick={onClose}
        className="block text-center text-sm font-semibold text-[#2354A4] py-3 hover:bg-[#F7F9FC] transition-colors"
      >
        Voir tous les résultats
      </Link>
    </div>
  )
}
