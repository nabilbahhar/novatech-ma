"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCartStore, type CartItem as CartItemType } from "@/store/cart"
import { formatPrice } from "@/lib/pricing"

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQty, removeItem } = useCartStore()

  return (
    <div className="flex gap-3 bg-[#F7F9FC] rounded-xl p-3">
      <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center p-1">
        {item.image_main ? (
          <Image
            src={item.image_main}
            alt={item.title_commercial}
            width={60}
            height={60}
            className="object-contain"
          />
        ) : (
          <span className="text-[10px] font-bold text-[#2354A4]">
            {item.brand}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[#2354A4] uppercase">
          {item.brand}
        </p>
        <p className="text-sm font-medium text-[#0B1F3A] line-clamp-1">
          {item.title_commercial}
        </p>
        <p className="text-sm font-bold text-[#D42B3A] mt-1">
          {formatPrice(item.price_ttc * item.qty)}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQty(item.sku, item.qty - 1)}
            className="w-7 h-7 rounded-md bg-white border border-[#E2E8F4] flex items-center justify-center hover:bg-[#EEF4FC] transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-bold text-[#0B1F3A] w-6 text-center">
            {item.qty}
          </span>
          <button
            onClick={() => updateQty(item.sku, item.qty + 1)}
            className="w-7 h-7 rounded-md bg-white border border-[#E2E8F4] flex items-center justify-center hover:bg-[#EEF4FC] transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => removeItem(item.sku)}
            className="ml-auto text-[#6B7A99] hover:text-[#D42B3A] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
