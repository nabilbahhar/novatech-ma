"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  headline: string
  sub: string
  stats: { value: string; label: string }[]
  ctas: { label: string; href: string; primary: boolean }[]
}

export function HeroSection({ headline, sub, stats, ctas }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#112D54] to-[#1A3D6E] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            {headline}
          </h1>
          <p className="text-[#D6E4F7]/80 text-base md:text-lg mt-4">{sub}</p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${
                  cta.primary
                    ? "bg-[#D42B3A] hover:bg-[#A81F2C] text-white shadow-lg hover:shadow-xl"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                {cta.label}
                {cta.primary && <ArrowRight className="w-4 h-4" />}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-[#D6E4F7]/60 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
