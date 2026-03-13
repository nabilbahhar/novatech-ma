"use client"

import Link from "next/link"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { CartItem } from "@/components/cart/CartItem"
import { CartSummary } from "@/components/cart/CartSummary"
import { useCartStore } from "@/store/cart"

export default function CartPage() {
  const items = useCartStore((s) => s.items)

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
          Panier
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-[#E2E8F4] mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#0B1F3A] mb-2">
              Votre panier est vide
            </h2>
            <p className="text-[#6B7A99] mb-6">
              Découvrez notre catalogue de matériel informatique.
            </p>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#112D54] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voir le catalogue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            <div className="space-y-3">
              {items.map((item) => (
                <CartItem key={item.sku} item={item} />
              ))}
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
