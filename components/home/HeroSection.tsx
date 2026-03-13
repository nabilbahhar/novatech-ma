"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Truck, ShieldCheck, Clock, Zap } from "lucide-react"

interface HeroSectionProps {
  headline: string
  sub: string
  stats: { value: string; label: string }[]
  ctas: { label: string; href: string; primary: boolean }[]
}

export function HeroSection({ sub, stats, ctas }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#112D54] to-[#1A3D6E] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#2354A4]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#D42B3A]/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Main content - centered */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.15] tracking-tight">
              Le{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#7DD3FC]">
                matériel informatique
              </span>
              <br className="hidden sm:block" />
              {" "}au meilleur prix au{" "}
              <span className="text-[#D42B3A]">Maroc</span>
            </h1>

            <p className="text-[#D6E4F7]/60 text-sm md:text-base mt-3 max-w-xl mx-auto">
              {sub}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
          >
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  cta.primary
                    ? "bg-[#D42B3A] hover:bg-[#B82333] text-white shadow-lg shadow-[#D42B3A]/25 hover:shadow-xl hover:shadow-[#D42B3A]/35 hover:-translate-y-0.5"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                }`}
              >
                {cta.label}
                {cta.primary && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            ))}
          </motion.div>

          {/* Stats - inline compact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center justify-center gap-6 sm:gap-10 mt-8"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && <div className="hidden sm:block w-px h-8 bg-white/10 -ml-3 sm:-ml-5" />}
                <div className="text-center">
                  <div className="font-display text-xl md:text-2xl font-extrabold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-[11px] text-[#D6E4F7]/40 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust strip - compact horizontal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/[0.06]"
        >
          {[
            { icon: Truck, text: "Livraison J+2" },
            { icon: ShieldCheck, text: "Garanti vérifié" },
            { icon: Clock, text: "Devis en 2h" },
            { icon: Zap, text: "Paiement à la livraison" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5">
              <item.icon className="w-3.5 h-3.5 text-[#58A6FF]/70" />
              <span className="text-[11px] font-medium text-white/50">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
