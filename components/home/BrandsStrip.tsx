"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const BRANDS = [
  { name: "Dell", slug: "dell", logo: "https://logo.clearbit.com/dell.com" },
  { name: "HP", slug: "hp", logo: "https://logo.clearbit.com/hp.com" },
  { name: "Lenovo", slug: "lenovo", logo: "https://logo.clearbit.com/lenovo.com" },
  { name: "Cisco", slug: "cisco", logo: "https://logo.clearbit.com/cisco.com" },
  { name: "Jabra", slug: "jabra", logo: "https://logo.clearbit.com/jabra.com" },
  { name: "Canon", slug: "canon", logo: "https://logo.clearbit.com/canon.com" },
  { name: "Epson", slug: "epson", logo: "https://logo.clearbit.com/epson.com" },
  { name: "Xerox", slug: "xerox", logo: "https://logo.clearbit.com/xerox.com" },
  { name: "Philips", slug: "philips", logo: "https://logo.clearbit.com/philips.com" },
  { name: "Poly", slug: "poly", logo: "https://logo.clearbit.com/poly.com" },
  { name: "Toshiba", slug: "toshiba", logo: "https://logo.clearbit.com/toshiba.com" },
  { name: "Lexmark", slug: "lexmark", logo: "https://logo.clearbit.com/lexmark.com" },
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
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={`/catalogue?brands=${brand.name}`}
                className="group block grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
