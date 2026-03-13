"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Monitor,
  Laptop,
  Headphones,
  Cable,
  Briefcase,
  Wifi,
  Printer,
} from "lucide-react"

const CATEGORIES = [
  {
    name: "Ordinateurs",
    desc: "PC portables & bureaux",
    slug: "ordinateurs",
    icon: Laptop,
    gradient: "from-blue-600 to-blue-800",
    iconBg: "bg-blue-500/20",
    count: "40+",
  },
  {
    name: "Écrans",
    desc: "Moniteurs & affichage",
    slug: "ecrans",
    icon: Monitor,
    gradient: "from-violet-600 to-violet-800",
    iconBg: "bg-violet-500/20",
    count: "25+",
  },
  {
    name: "Accessoires",
    desc: "Claviers, souris, câbles",
    slug: "accessoires",
    icon: Cable,
    gradient: "from-emerald-600 to-emerald-800",
    iconBg: "bg-emerald-500/20",
    count: "80+",
  },
  {
    name: "Audio Pro",
    desc: "Casques & solutions UC",
    slug: "audio",
    icon: Headphones,
    gradient: "from-orange-500 to-orange-700",
    iconBg: "bg-orange-500/20",
    count: "30+",
  },
  {
    name: "Bagagerie",
    desc: "Sacoches & sacs à dos",
    slug: "bagagerie",
    icon: Briefcase,
    gradient: "from-rose-500 to-rose-700",
    iconBg: "bg-rose-500/20",
    count: "15+",
  },
  {
    name: "Réseau",
    desc: "Switches, routeurs, SFP",
    slug: "reseau",
    icon: Wifi,
    gradient: "from-cyan-500 to-cyan-700",
    iconBg: "bg-cyan-500/20",
    count: "20+",
  },
  {
    name: "Impression",
    desc: "Imprimantes & toners",
    slug: "impression",
    icon: Printer,
    gradient: "from-amber-500 to-amber-700",
    iconBg: "bg-amber-500/20",
    count: "50+",
  },
]

export function CategoriesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0B1F3A]">
            Nos catégories
          </h2>
          <p className="text-[#6B7A99] text-sm mt-1">
            Trouvez rapidement ce dont vous avez besoin
          </p>
        </div>
        <Link
          href="/catalogue"
          className="hidden md:inline-flex text-sm font-bold text-[#2354A4] hover:text-[#D42B3A] transition-colors"
        >
          Voir tout &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/catalogue/${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-[#E2E8F4] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Colored top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`} />

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-14 h-14 rounded-xl ${cat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-[#0B1F3A]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#6B7A99] bg-[#F7F9FC] px-2 py-1 rounded-full">
                      {cat.count} réf.
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0B1F3A] mt-4 group-hover:text-[#2354A4] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#6B7A99] mt-0.5">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
