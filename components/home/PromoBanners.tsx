"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Truck, Building2, Percent } from "lucide-react"

const BANNERS = [
  {
    icon: Truck,
    title: "Livraison Express",
    desc: "Casablanca J+2, partout au Maroc J+5",
    color: "from-blue-600 to-cyan-500",
    href: "/catalogue",
  },
  {
    icon: Building2,
    title: "Service Entreprise",
    desc: "Devis personnalisé en 2h, facture TVA",
    color: "from-[#0B1F3A] to-[#2354A4]",
    href: "/devis",
  },
  {
    icon: Percent,
    title: "Meilleurs Prix Garantis",
    desc: "Prix compétitifs sur tout le catalogue",
    color: "from-[#D42B3A] to-[#F0A500]",
    href: "/catalogue",
  },
]

export function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BANNERS.map((banner, i) => (
          <motion.div
            key={banner.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={banner.href}
              className={`group block bg-gradient-to-r ${banner.color} rounded-2xl p-6 text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <banner.icon className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold text-lg">{banner.title}</h3>
              <p className="text-white/70 text-sm mt-1">{banner.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
