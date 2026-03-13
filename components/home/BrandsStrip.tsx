"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const BRANDS = [
  { name: "Dell", slug: "dell" },
  { name: "Jabra", slug: "jabra" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "Cisco", slug: "cisco" },
  { name: "Philips", slug: "philips" },
  { name: "Poly", slug: "poly" },
  { name: "HP", slug: "hp" },
  { name: "Canon", slug: "canon" },
  { name: "Xerox", slug: "xerox" },
  { name: "Epson", slug: "epson" },
  { name: "Toshiba", slug: "toshiba" },
  { name: "Lexmark", slug: "lexmark" },
]

export function BrandsStrip() {
  return (
    <section className="bg-[#F7F9FC] border-y border-[#E2E8F4] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-bold text-[#6B7A99] uppercase tracking-[0.2em] mb-8"
        >
          Ils nous font confiance — Nos marques partenaires
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={`/marques/${brand.slug}`}
                className="group relative block"
              >
                <span className="text-xl md:text-2xl font-display font-extrabold text-[#8DA4C4] group-hover:text-[#0B1F3A] transition-all duration-300">
                  {brand.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D42B3A] group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
