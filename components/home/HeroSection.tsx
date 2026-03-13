"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Truck, ShieldCheck, Clock, Zap } from "lucide-react"

interface HeroSectionProps {
  headline: string
  sub: string
  stats: { value: string; label: string }[]
  ctas: { label: string; href: string; primary: boolean }[]
}

export function HeroSection({ headline, sub, stats, ctas }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#112D54] to-[#1A3D6E] overflow-hidden min-h-[520px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#2354A4]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#D42B3A]/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-white/90">
                Stock mis à jour en temps réel
              </span>
            </motion.div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
              {headline.includes("meilleur prix") ? (
                <>
                  Le <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#7DD3FC]">matériel informatique</span>
                  <br />au meilleur prix au <span className="text-[#D42B3A]">Maroc</span>
                </>
              ) : (
                headline
              )}
            </h1>

            <p className="text-[#D6E4F7]/70 text-base md:text-lg mt-4 max-w-lg">
              {sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={`group flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    cta.primary
                      ? "bg-[#D42B3A] hover:bg-[#B82333] text-white shadow-lg shadow-[#D42B3A]/30 hover:shadow-xl hover:shadow-[#D42B3A]/40 hover:-translate-y-0.5"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                  }`}
                >
                  {cta.label}
                  {cta.primary && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mini trust icons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: Truck, text: "Livraison J+2" },
                { icon: ShieldCheck, text: "Garanti vérifié" },
                { icon: Clock, text: "Devis en 2h" },
                { icon: Zap, text: "Paiement à la livraison" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5">
                  <item.icon className="w-3.5 h-3.5 text-[#58A6FF]" />
                  <span className="text-[11px] font-medium text-white/60">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Product showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main product image */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2354A4]/30 to-[#D42B3A]/20 rounded-3xl blur-2xl scale-95" />

              {/* Product grid showcase */}
              <div className="relative grid grid-cols-2 gap-4">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-center"
                >
                  <Image
                    src="https://webobjects2.cdw.com/is/image/CDW/5765270?$product-detail$"
                    alt="Dell Latitude"
                    width={200}
                    height={160}
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-center mt-8"
                >
                  <Image
                    src="https://webobjects2.cdw.com/is/image/CDW/5466640?$product-detail$"
                    alt="Jabra Evolve2"
                    width={200}
                    height={160}
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-center -mt-4"
                >
                  <Image
                    src="https://webobjects2.cdw.com/is/image/CDW/6069272?$product-detail$"
                    alt="Epson Printer"
                    width={200}
                    height={160}
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-center mt-4"
                >
                  <Image
                    src="https://webobjects2.cdw.com/is/image/CDW/5852984?$product-detail$"
                    alt="Dell Monitor"
                    width={200}
                    height={160}
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-[#D6E4F7]/50 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
