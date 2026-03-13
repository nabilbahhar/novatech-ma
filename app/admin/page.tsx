"use client"

import { useEffect, useState } from "react"
import { Package, ShoppingBag, FileText, TrendingUp } from "lucide-react"

interface Stats {
  totalProducts: number
  inStockProducts: number
  totalOrders: number
  pendingOrders: number
  totalQuotes: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    inStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalQuotes: 0,
  })

  useEffect(() => {
    // Stats would be fetched from API
    setStats({
      totalProducts: 232,
      inStockProducts: 180,
      totalOrders: 0,
      pendingOrders: 0,
      totalQuotes: 0,
    })
  }, [])

  const cards = [
    {
      icon: Package,
      label: "Produits",
      value: stats.totalProducts,
      sub: `${stats.inStockProducts} en stock`,
      color: "text-[#2354A4]",
      bg: "bg-[#2354A4]/10",
    },
    {
      icon: ShoppingBag,
      label: "Commandes",
      value: stats.totalOrders,
      sub: `${stats.pendingOrders} en attente`,
      color: "text-[#00B87A]",
      bg: "bg-[#00B87A]/10",
    },
    {
      icon: FileText,
      label: "Devis",
      value: stats.totalQuotes,
      sub: "demandes",
      color: "text-[#F0A500]",
      bg: "bg-[#F0A500]/10",
    },
    {
      icon: TrendingUp,
      label: "Stock total",
      value: "6 800+",
      sub: "unités",
      color: "text-[#D42B3A]",
      bg: "bg-[#D42B3A]/10",
    },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-[#E2E8F4] p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center`}
              >
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <span className="text-sm font-medium text-[#6B7A99]">
                {card.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0B1F3A]">{card.value}</p>
            <p className="text-xs text-[#6B7A99] mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <h2 className="font-bold text-[#0B1F3A] mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href="/admin/produits"
            className="p-4 bg-[#F7F9FC] rounded-lg text-sm font-medium text-[#0B1F3A] hover:bg-[#EEF4FC] transition-colors"
          >
            Gérer les produits
          </a>
          <a
            href="/admin/commandes"
            className="p-4 bg-[#F7F9FC] rounded-lg text-sm font-medium text-[#0B1F3A] hover:bg-[#EEF4FC] transition-colors"
          >
            Voir les commandes
          </a>
          <a
            href="/admin/devis"
            className="p-4 bg-[#F7F9FC] rounded-lg text-sm font-medium text-[#0B1F3A] hover:bg-[#EEF4FC] transition-colors"
          >
            Gérer les devis
          </a>
        </div>
      </div>
    </div>
  )
}
