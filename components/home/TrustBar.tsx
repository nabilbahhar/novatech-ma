import { Truck, Shield, Clock, Receipt } from "lucide-react"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  shield: Shield,
  clock: Clock,
  receipt: Receipt,
}

interface TrustBarProps {
  items: { icon: string; label: string }[]
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="bg-white border-b border-[#E2E8F4]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const Icon = ICONS[item.icon] || Shield
            return (
              <div
                key={item.label}
                className="flex items-center gap-2.5 justify-center lg:justify-start"
              >
                <div className="w-9 h-9 bg-[#EEF4FC] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#2354A4]" />
                </div>
                <span className="text-xs font-semibold text-[#0B1F3A]">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
