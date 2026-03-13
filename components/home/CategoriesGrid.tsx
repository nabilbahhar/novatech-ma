import Link from "next/link"
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
    name: "Ordinateurs & PC",
    slug: "ordinateurs",
    icon: Laptop,
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    name: "Écrans & Affichage",
    slug: "ecrans",
    icon: Monitor,
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    name: "Accessoires",
    slug: "accessoires",
    icon: Cable,
    color: "from-green-500/10 to-green-600/5",
  },
  {
    name: "Casques & Audio Pro",
    slug: "audio",
    icon: Headphones,
    color: "from-orange-500/10 to-orange-600/5",
  },
  {
    name: "Bagagerie",
    slug: "bagagerie",
    icon: Briefcase,
    color: "from-rose-500/10 to-rose-600/5",
  },
  {
    name: "Réseau",
    slug: "reseau",
    icon: Wifi,
    color: "from-cyan-500/10 to-cyan-600/5",
  },
  {
    name: "Impression",
    slug: "impression",
    icon: Printer,
    color: "from-amber-500/10 to-amber-600/5",
  },
]

export function CategoriesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
        Nos catégories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.slug}
              href={`/catalogue/${cat.slug}`}
              className="group bg-white rounded-xl border border-[#E2E8F4] p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3`}
              >
                <Icon className="w-6 h-6 text-[#2354A4]" />
              </div>
              <h3 className="font-semibold text-sm text-[#0B1F3A] group-hover:text-[#2354A4] transition-colors">
                {cat.name}
              </h3>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
