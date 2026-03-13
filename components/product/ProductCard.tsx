"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, FileText, MessageCircle } from "lucide-react"
import { StockBadge } from "./StockBadge"
import { PriceBlock } from "./PriceBlock"
import { useCartStore } from "@/store/cart"
import { generateWhatsAppLink } from "@/lib/whatsapp"
import type { Product } from "@/types"

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const addToCart = useCartStore((s) => s.addItem)

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(11,31,58,0.12)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative bg-white rounded-[14px] border border-[#E2E8F4] overflow-hidden flex flex-col shadow-card"
    >
      <Link href={`/produit/${product.slug}`} className="block">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge_best_price && (
            <motion.span
              animate={{ opacity: [1, 0.75, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-[#D42B3A] text-white text-[10px] font-bold px-2 py-0.5 rounded-md"
            >
              MEILLEUR PRIX
            </motion.span>
          )}
          {product.badge_new && (
            <span className="bg-[#0B1F3A] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              NOUVEAU
            </span>
          )}
          {product.availability_status === "low_stock" && (
            <motion.span
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-[#F0A500] text-white text-[10px] font-bold px-2 py-0.5 rounded-md"
            >
              STOCK LIMITÉ
            </motion.span>
          )}
        </div>

        {/* Image zone */}
        <div className="relative bg-white flex items-center justify-center h-[180px] p-4">
          {product.image_main ? (
            <Image
              src={product.image_main}
              alt={product.title_commercial}
              width={280}
              height={180}
              className="object-contain max-h-full w-auto"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F9FC] rounded-lg">
              <div className="text-[#2354A4] font-bold text-lg">
                {product.brand}
              </div>
              <div className="text-[#6B7A99] text-xs mt-1 text-center px-4">
                {product.title_commercial.slice(0, 40)}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/produit/${product.slug}`}>
          <div className="text-[11px] font-bold text-[#2354A4] uppercase tracking-wider">
            {product.brand}
          </div>
          <h3 className="text-sm font-semibold text-[#0B1F3A] leading-tight line-clamp-2 mt-1 hover:text-[#2354A4] transition-colors">
            {product.title_commercial}
          </h3>
        </Link>

        <StockBadge
          status={product.availability_status}
          qty={product.stock_qty}
        />

        <PriceBlock
          priceTTC={product.price_ttc}
          priceHT={product.price_ht}
          priceCrossed={product.price_crossed}
          priceEconomy={product.price_economy}
        />

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#0B1F3A] hover:bg-[#112D54] text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Panier
          </button>
          <a
            href={generateWhatsAppLink({
              type: "product",
              productName: product.title_commercial,
              productSku: product.sku,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1da853] text-white p-2.5 rounded-lg transition-colors flex items-center"
            title="Commander via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            className="border border-[#E2E8F4] hover:border-[#0B1F3A] text-[#0B1F3A] p-2.5 rounded-lg transition-colors"
            title="Demander un devis"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
