import Link from "next/link"

const BRANDS = [
  { name: "Dell", slug: "dell" },
  { name: "Jabra", slug: "jabra" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "Cisco", slug: "cisco" },
  { name: "Philips", slug: "philips" },
  { name: "Poly", slug: "poly" },
  { name: "HP", slug: "hp" },
  { name: "Canon", slug: "canon" },
]

export function BrandsStrip() {
  return (
    <section className="bg-white border-y border-[#E2E8F4] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-semibold text-[#6B7A99] uppercase tracking-widest mb-6">
          Nos marques partenaires
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/marques/${brand.slug}`}
              className="text-xl md:text-2xl font-display font-bold text-[#D6E4F7] hover:text-[#2354A4] transition-colors"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
