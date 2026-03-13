"use client"

interface StockBadgeProps {
  status: string
  qty: number
}

export function StockBadge({ status, qty }: StockBadgeProps) {
  const config = {
    in_stock: {
      color: "bg-[#00B87A]",
      text: "text-[#00B87A]",
      label: `En stock (${qty} unités)`,
      bg: "bg-[#00B87A]/10",
    },
    low_stock: {
      color: "bg-[#F0A500]",
      text: "text-[#F0A500]",
      label: `Stock limité (${qty} restants)`,
      bg: "bg-[#F0A500]/10",
    },
    incoming: {
      color: "bg-[#2354A4]",
      text: "text-[#2354A4]",
      label: "Réapprovisionnement en cours",
      bg: "bg-[#2354A4]/10",
    },
    out_of_stock: {
      color: "bg-[#6B7A99]",
      text: "text-[#6B7A99]",
      label: "Rupture de stock",
      bg: "bg-[#6B7A99]/10",
    },
  }

  const c = config[status as keyof typeof config] || config.out_of_stock

  return (
    <div className={`flex items-center gap-2 ${c.bg} rounded-md px-2 py-1`}>
      <span
        className={`w-2 h-2 rounded-full ${c.color} ${
          status === "in_stock" || status === "low_stock"
            ? "animate-stock-pulse"
            : ""
        }`}
      />
      <span className={`text-[11px] font-semibold ${c.text}`}>{c.label}</span>
    </div>
  )
}
