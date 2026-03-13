import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold">
              NOVA<span className="text-[#D42B3A]">TECH</span>
              <span className="text-[#6B7A99] text-sm">.MA</span>
            </span>
            <p className="text-sm text-[#D6E4F7]/70 mt-3 leading-relaxed">
              Votre partenaire IT au Maroc. Stock disponible, livraison rapide,
              prix imbattables.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://wa.me/212661530307"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
              Catalogue
            </h4>
            <div className="space-y-2.5">
              {[
                { name: "Ordinateurs", slug: "ordinateurs" },
                { name: "Écrans", slug: "ecrans" },
                { name: "Accessoires", slug: "accessoires" },
                { name: "Audio Pro", slug: "audio" },
                { name: "Réseau", slug: "reseau" },
                { name: "Impression", slug: "impression" },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/catalogue/${cat.slug}`}
                  className="block text-sm text-[#D6E4F7]/70 hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
              Services
            </h4>
            <div className="space-y-2.5">
              <Link
                href="/devis"
                className="block text-sm text-[#D6E4F7]/70 hover:text-white transition-colors"
              >
                Devis Entreprise
              </Link>
              <Link
                href="/catalogue"
                className="block text-sm text-[#D6E4F7]/70 hover:text-white transition-colors"
              >
                Catalogue complet
              </Link>
              <span className="block text-sm text-[#D6E4F7]/70">
                Livraison partout au Maroc
              </span>
              <span className="block text-sm text-[#D6E4F7]/70">
                Paiement à la livraison
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+212661530307"
                className="flex items-center gap-2 text-sm text-[#D6E4F7]/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +212 661 530 307
              </a>
              <a
                href="mailto:contact@novatech.ma"
                className="flex items-center gap-2 text-sm text-[#D6E4F7]/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                contact@novatech.ma
              </a>
              <div className="flex items-start gap-2 text-sm text-[#D6E4F7]/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Casablanca, Maroc
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7A99]">
            &copy; {new Date().getFullYear()} NOVATECH.MA. Tous droits
            réservés.
          </p>
          <p className="text-xs text-[#6B7A99]">
            TVA 20% incluse sur tous les prix TTC affichés
          </p>
        </div>
      </div>
    </footer>
  )
}
