"use client"

import { formatPrice } from "@/lib/pricing"

interface PriceBlockProps {
  priceTTC: number
  priceHT: number
  priceCrossed?: number | null
  priceEconomy?: number | null
}

export function PriceBlock({
  priceTTC,
  priceHT,
  priceCrossed,
  priceEconomy,
}: PriceBlockProps) {
  return (
    <div className="space-y-0.5">
      {priceCrossed && priceCrossed > priceTTC && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7A99] line-through">
            {formatPrice(priceCrossed)}
          </span>
          {priceEconomy && priceEconomy > 0 && (
            <span className="text-[10px] font-bold text-[#00B87A] bg-[#00B87A]/10 px-1.5 py-0.5 rounded">
              -{formatPrice(priceEconomy)}
            </span>
          )}
        </div>
      )}
      <div className="text-lg font-bold text-[#D42B3A]">
        {formatPrice(priceTTC)}
        <span className="text-[10px] font-medium text-[#6B7A99] ml-1">TTC</span>
      </div>
      <div className="text-xs text-[#6B7A99]">
        {formatPrice(priceHT)} HT
      </div>
    </div>
  )
}
