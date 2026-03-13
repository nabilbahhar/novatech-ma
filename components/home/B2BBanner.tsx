"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle, FileText, ArrowRight, CheckCircle2 } from "lucide-react"
import { generateWhatsAppLink } from "@/lib/whatsapp"

export function B2BBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-br from-[#0B1F3A] via-[#112D54] to-[#1A3D6E] rounded-3xl p-8 md:p-12 text-white overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2354A4]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D42B3A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1 text-xs font-bold mb-4">
              B2B & ENTREPRISES
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold mb-4 leading-tight">
              Un partenaire IT
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#7DD3FC]">
                pour votre entreprise
              </span>
            </h2>
            <p className="text-[#D6E4F7]/70 mb-6 max-w-md">
              Obtenez un devis personnalisé en moins de 2 heures. Accompagnement
              dédié pour tous vos projets informatiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/devis"
                className="group inline-flex items-center gap-2 bg-white text-[#0B1F3A] font-bold px-6 py-3.5 rounded-xl hover:bg-[#F7F9FC] transition-all duration-300 hover:shadow-lg"
              >
                <FileText className="w-4 h-4" />
                Demander un devis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={generateWhatsAppLink({ type: "quote" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#1da853] transition-all duration-300 hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Direct
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "Devis personnalisé en 2h",
              "Facture TVA officielle",
              "Livraison sur site entreprise",
              "Support technique dédié",
              "Tarifs préférentiels volumes",
              "Contrats de maintenance",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                <span className="text-sm font-medium text-white/90">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
