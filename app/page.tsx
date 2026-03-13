"use client"

import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/home/HeroSection"
import { CategoriesGrid } from "@/components/home/CategoriesGrid"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { BrandsStrip } from "@/components/home/BrandsStrip"
import { B2BBanner } from "@/components/home/B2BBanner"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />

      <AnnouncementBar
        items={[
          "Livraison partout au Maroc",
          "Paiement à la livraison",
          "Stock vérifié quotidiennement",
          "Devis entreprise en 2h",
        ]}
      />

      <Header />

      <HeroSection
        headline="Le matériel informatique au meilleur prix au Maroc"
        sub="Stock réel disponible · Livraison 24-48h · Paiement à la livraison"
        stats={[
          { value: "6 800+", label: "Unités en stock" },
          { value: "250+", label: "Références disponibles" },
          { value: "35+", label: "Marques partenaires" },
        ]}
        ctas={[
          { label: "Voir le catalogue", href: "/catalogue", primary: true },
          { label: "Devis entreprise", href: "/devis", primary: false },
        ]}
      />

      <CategoriesGrid />

      <FeaturedProducts
        title="Disponibles immédiatement"
        limit={16}
        sortBy="stock_qty"
      />

      <BrandsStrip />

      <B2BBanner />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose prose-sm max-w-none text-[#6B7A99]">
          <h2 className="text-lg font-bold text-[#0B1F3A]">
            NOVATECH.MA — Votre partenaire informatique au Maroc
          </h2>
          <p>
            NOVATECH.MA est le site e-commerce de référence pour le matériel
            informatique professionnel au Maroc. Notre catalogue propose des
            ordinateurs portables, des écrans, des accessoires et des solutions
            audio des plus grandes marques internationales : Dell, Jabra, Lenovo,
            Cisco et bien d&apos;autres.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
