"use client"

import { X, ShoppingCart } from "lucide-react"
import { CartItem } from "./CartItem"
import { CartSummary } from "./CartSummary"
import { useCartStore } from "@/store/cart"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#E2E8F4]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#0B1F3A]" />
            <h2 className="font-bold text-[#0B1F3A]">
              Panier ({items.length})
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-[#6B7A99]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="w-12 h-12 text-[#E2E8F4] mx-auto mb-3" />
              <p className="text-[#6B7A99]">Votre panier est vide</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <CartItem key={item.sku} item={item} />
              ))}
            </div>
            <CartSummary onClose={onClose} />
          </>
        )}
      </div>
    </div>
  )
}
