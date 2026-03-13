"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { QuoteForm } from "@/components/b2b/QuoteForm"
import { Shield, Clock, FileText, Truck } from "lucide-react"

export default function DevisPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold text-[#0B1F3A] mb-3">
            Devis Entreprise
          </h1>
          <p className="text-[#6B7A99] max-w-xl mx-auto">
            Obtenez un devis personnalisé en moins de 2 heures. Facture TVA,
            conditions de paiement flexibles, livraison sur site.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Clock, label: "Réponse en 2h", desc: "Jours ouvrés" },
            { icon: FileText, label: "Facture TVA", desc: "ICE inclus" },
            { icon: Truck, label: "Livraison site", desc: "Partout au Maroc" },
            { icon: Shield, label: "Garantie", desc: "Constructeur officielle" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-[#E2E8F4] p-4 text-center"
            >
              <item.icon className="w-6 h-6 text-[#2354A4] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#0B1F3A]">{item.label}</p>
              <p className="text-xs text-[#6B7A99]">{item.desc}</p>
            </div>
          ))}
        </div>

        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
