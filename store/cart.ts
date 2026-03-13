"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types"

export interface CartItem extends Product {
  qty: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (sku: string) => void
  updateQty: (sku: string, qty: number) => void
  clear: () => void
  totalHT: () => number
  totalTTC: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.sku === product.sku)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.sku === product.sku ? { ...i, qty: i.qty + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...product, qty: 1 }] }
        }),
      removeItem: (sku) =>
        set((s) => ({ items: s.items.filter((i) => i.sku !== sku) })),
      updateQty: (sku, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.sku !== sku)
              : s.items.map((i) => (i.sku === sku ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      totalHT: () =>
        get().items.reduce((acc, i) => acc + (i.price_ht || 0) * i.qty, 0),
      totalTTC: () =>
        get().items.reduce((acc, i) => acc + (i.price_ttc || 0) * i.qty, 0),
      itemCount: () => get().items.reduce((acc, i) => acc + i.qty, 0),
    }),
    { name: "novatech-cart" }
  )
)
