"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { generateWhatsAppLink } from "@/lib/whatsapp"
import { formatPrice } from "@/lib/pricing"

export function CartSummary({ onClose }: { onClose?: () => void }) {
  const { items, totalHT, totalTTC } = useCartStore()

  const waLink = generateWhatsAppLink({
    type: "cart",
    items: items.map((i) => ({
      name: i.title_commercial,
      qty: i.qty,
      price: i.price_ttc * i.qty,
    })),
    total: totalTTC(),
  })

  return (
    <div className="border-t border-[#E2E8F4] p-4 space-y-3">
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm text-[#6B7A99]">
          <span>Sous-total HT</span>
          <span>{formatPrice(totalHT())}</span>
        </div>
        <div className="flex justify-between text-sm text-[#6B7A99]">
          <span>TVA (20%)</span>
          <span>{formatPrice(totalTTC() - totalHT())}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-[#0B1F3A] pt-1.5 border-t border-[#E2E8F4]">
          <span>Total TTC</span>
          <span className="text-[#D42B3A]">{formatPrice(totalTTC())}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Link
          href="/commande"
          onClick={onClose}
          className="block w-full text-center bg-[#0B1F3A] hover:bg-[#112D54] text-white font-bold py-3 rounded-xl transition-colors"
        >
          Commander
        </Link>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da853] text-white font-bold py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Commander via WhatsApp
        </a>
      </div>
    </div>
  )
}
