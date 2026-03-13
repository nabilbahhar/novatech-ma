"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, Phone } from "lucide-react"
import { SearchBar } from "@/components/search/SearchBar"
import { MobileNav } from "./MobileNav"
import { useCartStore } from "@/store/cart"

const CATEGORIES = [
  { name: "Ordinateurs", slug: "ordinateurs", icon: "💻" },
  { name: "Écrans", slug: "ecrans", icon: "🖥️" },
  { name: "Accessoires", slug: "accessoires", icon: "🔌" },
  { name: "Audio Pro", slug: "audio", icon: "🎧" },
  { name: "Bagagerie", slug: "bagagerie", icon: "💼" },
  { name: "Réseau", slug: "reseau", icon: "📡" },
  { name: "Impression", slug: "impression", icon: "🖨️" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount())

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F4]">
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[#0B1F3A]"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-display text-xl font-bold text-[#0B1F3A]">
                NOVA<span className="text-[#D42B3A]">TECH</span>
                <span className="text-[#6B7A99] text-sm">.MA</span>
              </span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <SearchBar />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+212661530307"
                className="hidden lg:flex items-center gap-1.5 text-sm text-[#0B1F3A] font-medium hover:text-[#2354A4] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+212 661 530 307</span>
              </a>

              <Link
                href="/devis"
                className="hidden lg:flex items-center gap-1.5 text-sm bg-[#F7F9FC] text-[#0B1F3A] font-semibold px-3 py-2 rounded-lg hover:bg-[#EEF4FC] transition-colors"
              >
                Devis Pro
              </Link>

              <Link
                href="/panier"
                className="relative p-2 text-[#0B1F3A] hover:text-[#2354A4] transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D42B3A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>

        {/* Desktop category nav */}
        <nav className="hidden lg:block border-t border-[#E2E8F4] bg-[#F7F9FC]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 h-10">
              <Link
                href="/catalogue"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#0B1F3A] hover:bg-white rounded-md transition-colors"
              >
                Tous les produits
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/catalogue/${cat.slug}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#6B7A99] hover:text-[#0B1F3A] hover:bg-white rounded-md transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="ml-auto flex items-center gap-1">
                {["Dell", "Jabra", "Lenovo", "Cisco"].map((brand) => (
                  <Link
                    key={brand}
                    href={`/marques/${brand.toLowerCase()}`}
                    className="px-2 py-1 text-[10px] font-bold text-[#2354A4] uppercase tracking-wider hover:bg-white rounded transition-colors"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={CATEGORIES}
      />
    </>
  )
}
