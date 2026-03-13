"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const BRANDS = [
  {
    name: "Dell",
    slug: "dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/200px-Dell_Logo.svg.png",
    w: 80,
    h: 28,
  },
  {
    name: "HP",
    slug: "hp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/150px-HP_logo_2012.svg.png",
    w: 50,
    h: 50,
  },
  {
    name: "Lenovo",
    slug: "lenovo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/200px-Lenovo_logo_2015.svg.png",
    w: 110,
    h: 20,
  },
  {
    name: "Cisco",
    slug: "cisco",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/200px-Cisco_logo_blue_2016.svg.png",
    w: 90,
    h: 48,
  },
  {
    name: "Jabra",
    slug: "jabra",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jabra_logo.svg/200px-Jabra_logo.svg.png",
    w: 90,
    h: 26,
  },
  {
    name: "Canon",
    slug: "canon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Canon_wordmark.svg/200px-Canon_wordmark.svg.png",
    w: 100,
    h: 22,
  },
  {
    name: "Epson",
    slug: "epson",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Epson_logo.svg/200px-Epson_logo.svg.png",
    w: 90,
    h: 28,
  },
  {
    name: "Xerox",
    slug: "xerox",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Xerox_logo_2019.svg/200px-Xerox_logo_2019.svg.png",
    w: 90,
    h: 28,
  },
  {
    name: "Philips",
    slug: "philips",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Philips_logo_new.svg/200px-Philips_logo_new.svg.png",
    w: 90,
    h: 30,
  },
  {
    name: "Poly",
    slug: "poly",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Poly_Inc._logo.svg/200px-Poly_Inc._logo.svg.png",
    w: 70,
    h: 28,
  },
  {
    name: "Toshiba",
    slug: "toshiba",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Toshiba_logo.svg/200px-Toshiba_logo.svg.png",
    w: 100,
    h: 16,
  },
  {
    name: "Lexmark",
    slug: "lexmark",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Lexmark_logo.svg/200px-Lexmark_logo.svg.png",
    w: 100,
    h: 22,
  },
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
                className="group block opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.w}
                  height={brand.h}
                  className="object-contain"
                  unoptimized
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
