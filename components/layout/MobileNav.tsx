"use client"

import Link from "next/link"
import { X, ChevronRight, Phone, FileText, MessageCircle } from "lucide-react"
import { generateWhatsAppLink } from "@/lib/whatsapp"

interface MobileNavProps {
  open: boolean
  onClose: () => void
  categories: { name: string; slug: string; icon: string }[]
}

export function MobileNav({ open, onClose, categories }: MobileNavProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white overflow-y-auto">
        <div className="p-4 border-b border-[#E2E8F4] flex items-center justify-between">
          <span className="font-display text-lg font-bold text-[#0B1F3A]">
            NOVA<span className="text-[#D42B3A]">TECH</span>
            <span className="text-[#6B7A99] text-xs">.MA</span>
          </span>
          <button onClick={onClose} className="p-1 text-[#6B7A99]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          <Link
            href="/catalogue"
            onClick={onClose}
            className="flex items-center justify-between py-3 text-sm font-bold text-[#0B1F3A] border-b border-[#E2E8F4]"
          >
            Tous les produits
            <ChevronRight className="w-4 h-4 text-[#6B7A99]" />
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogue/${cat.slug}`}
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm text-[#0B1F3A] border-b border-[#E2E8F4]"
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                {cat.name}
              </span>
              <ChevronRight className="w-4 h-4 text-[#6B7A99]" />
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-[#E2E8F4]">
          <Link
            href="/devis"
            onClick={onClose}
            className="flex items-center gap-2 py-2.5 px-3 bg-[#F7F9FC] rounded-lg text-sm font-semibold text-[#0B1F3A]"
          >
            <FileText className="w-4 h-4" />
            Devis Entreprise
          </Link>

          <a
            href="tel:+212661530307"
            className="flex items-center gap-2 py-2.5 px-3 bg-[#F7F9FC] rounded-lg text-sm font-semibold text-[#0B1F3A]"
          >
            <Phone className="w-4 h-4" />
            +212 661 530 307
          </a>

          <a
            href={generateWhatsAppLink({ type: "general" })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2.5 px-3 bg-[#25D366] rounded-lg text-sm font-bold text-white"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
