"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { FileText, MessageCircle, ShoppingCart, Truck, Shield, Clock } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { ProductGallery } from "@/components/product/ProductGallery"
import { StockBadge } from "@/components/product/StockBadge"
import { PriceBlock } from "@/components/product/PriceBlock"
import { SpecsTable } from "@/components/product/SpecsTable"
import { UpsellRow } from "@/components/product/UpsellRow"
import { ProductJsonLd } from "@/components/seo/ProductJsonLd"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { useCartStore } from "@/store/cart"
import { generateWhatsAppLink } from "@/lib/whatsapp"
import type { Product } from "@/types"

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const addToCart = useCartStore((s) => s.addItem)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products?slug=${slug}`)
        if (res.ok) {
          const data = await res.json()
          setProduct(data.product || null)
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-[#F7F9FC] rounded w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
              <div className="h-[400px] bg-[#F7F9FC] rounded-xl" />
              <div className="space-y-4">
                <div className="h-4 bg-[#F7F9FC] rounded w-20" />
                <div className="h-6 bg-[#F7F9FC] rounded w-full" />
                <div className="h-10 bg-[#F7F9FC] rounded w-32" />
                <div className="h-12 bg-[#F7F9FC] rounded" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#0B1F3A]">
            Produit non trouvé
          </h1>
          <p className="text-[#6B7A99] mt-2">
            Ce produit n&apos;existe pas ou a été retiré.
          </p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://novatech.ma" },
          {
            name: product.category,
            url: `https://novatech.ma/catalogue/${product.category}`,
          },
          {
            name: product.title_commercial,
            url: `https://novatech.ma/produit/${product.slug}`,
          },
        ]}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7A99] mb-6">
          <a href="/" className="hover:text-[#2354A4]">
            Accueil
          </a>
          <span>/</span>
          <a
            href={`/catalogue/${product.category}`}
            className="hover:text-[#2354A4] capitalize"
          >
            {product.category}
          </a>
          <span>/</span>
          <span className="text-[#0B1F3A] font-medium truncate">
            {product.title_commercial}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Left: Gallery + Details */}
          <div>
            <ProductGallery
              images={product.image_gallery || []}
              mainImage={product.image_main}
            />

            {/* Tabs: Specs, Description */}
            <div className="mt-8 space-y-6">
              {product.key_features && product.key_features.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-[#0B1F3A] mb-3">
                    Points clés
                  </h2>
                  <ul className="space-y-2">
                    {product.key_features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#6B7A99]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2354A4] mt-1.5 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.description_long && (
                <div>
                  <h2 className="text-lg font-bold text-[#0B1F3A] mb-3">
                    Description
                  </h2>
                  <p className="text-sm text-[#6B7A99] leading-relaxed">
                    {product.description_long}
                  </p>
                </div>
              )}

              {product.specs &&
                Object.keys(product.specs).length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-[#0B1F3A] mb-3">
                      Caractéristiques techniques
                    </h2>
                    <SpecsTable specs={product.specs} />
                  </div>
                )}
            </div>

            <UpsellRow
              category={product.subcategory || product.category}
              currentId={product.id}
            />
          </div>

          {/* Right: Sticky CTA */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div>
              <div className="text-xs font-bold text-[#2354A4] uppercase tracking-widest">
                {product.brand}
              </div>
              <h1 className="text-xl font-bold text-[#0B1F3A] mt-1 leading-tight">
                {product.title_commercial}
              </h1>
              <div className="flex gap-2 mt-3 flex-wrap">
                {product.badge_best_price && (
                  <span className="bg-[#D42B3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Meilleur Prix Maroc
                  </span>
                )}
                {product.badge_new && (
                  <span className="bg-[#0B1F3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Nouveau
                  </span>
                )}
              </div>
            </div>

            <StockBadge
              status={product.availability_status}
              qty={product.stock_qty}
            />

            {product.last_checked_at && (
              <p className="text-[10px] text-[#6B7A99]">
                Stock vérifié le{" "}
                {new Date(product.last_checked_at).toLocaleDateString("fr-MA")}
              </p>
            )}

            <PriceBlock
              priceTTC={product.price_ttc}
              priceHT={product.price_ht}
              priceCrossed={product.price_crossed}
              priceEconomy={product.price_economy}
            />

            {/* CTAs */}
            <div className="space-y-2.5">
              <button
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-[#0B1F3A] hover:bg-[#112D54] text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Ajouter au panier
              </button>
              <a
                href={generateWhatsAppLink({
                  type: "product",
                  productName: product.title_commercial,
                  productSku: product.sku,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da853] text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Commander via WhatsApp
              </a>
              <button className="w-full flex items-center justify-center gap-2 border-2 border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white font-bold py-3.5 rounded-xl transition-colors">
                <FileText className="w-4 h-4" />
                Demander un devis entreprise
              </button>
            </div>

            {/* Delivery info */}
            <div className="bg-[#F7F9FC] rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#2354A4]" />
                <span className="text-xs text-[#0B1F3A] font-medium">
                  Livraison 24-48h (Casablanca/Rabat/Tanger)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#2354A4]" />
                <span className="text-xs text-[#0B1F3A] font-medium">
                  Garantie constructeur officielle
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#2354A4]" />
                <span className="text-xs text-[#0B1F3A] font-medium">
                  Paiement à la livraison disponible
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky bar mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F4] p-3 flex gap-2 z-40">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 flex items-center justify-center gap-2 bg-[#0B1F3A] text-white font-bold py-3 rounded-xl"
        >
          <ShoppingCart className="w-4 h-4" />
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
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
