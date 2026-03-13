import Link from "next/link"
import { MessageCircle, FileText, ArrowRight } from "lucide-react"
import { generateWhatsAppLink } from "@/lib/whatsapp"

export function B2BBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3D6E] rounded-2xl p-8 md:p-12 text-white">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Vous êtes une entreprise ?
          </h2>
          <p className="text-[#D6E4F7]/80 mb-6">
            Obtenez un devis personnalisé en moins de 2 heures. Facture TVA,
            livraison sur site, support dédié.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 bg-white text-[#0B1F3A] font-bold px-6 py-3 rounded-xl hover:bg-[#F7F9FC] transition-colors"
            >
              <FileText className="w-4 h-4" />
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={generateWhatsAppLink({ type: "quote" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da853] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
