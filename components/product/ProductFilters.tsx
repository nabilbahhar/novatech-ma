"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface ProductFiltersProps {
  brands: FilterOption[]
  categories: FilterOption[]
  selectedBrands: string[]
  selectedCategories: string[]
  priceRange: [number, number]
  maxPrice: number
  inStockOnly: boolean
  onBrandChange: (brands: string[]) => void
  onCategoryChange: (categories: string[]) => void
  onPriceChange: (range: [number, number]) => void
  onStockChange: (inStock: boolean) => void
  onClear: () => void
}

export function ProductFilters({
  brands,
  categories,
  selectedBrands,
  selectedCategories,
  inStockOnly,
  onBrandChange,
  onCategoryChange,
  onStockChange,
  onClear,
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    brand: true,
    category: true,
    stock: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const hasFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    inStockOnly

  return (
    <aside className="space-y-4">
      {hasFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-[#D42B3A] font-semibold hover:underline"
        >
          <X className="w-3 h-3" />
          Effacer les filtres
        </button>
      )}

      {/* Stock */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-4">
        <button
          onClick={() => toggleSection("stock")}
          className="flex items-center justify-between w-full text-sm font-bold text-[#0B1F3A]"
        >
          Disponibilité
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.stock ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.stock && (
          <label className="flex items-center gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onStockChange(e.target.checked)}
              className="rounded border-[#E2E8F4] text-[#0B1F3A] focus:ring-[#2354A4]"
            />
            <span className="text-sm text-[#0B1F3A]">En stock uniquement</span>
          </label>
        )}
      </div>

      {/* Brands */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-4">
        <button
          onClick={() => toggleSection("brand")}
          className="flex items-center justify-between w-full text-sm font-bold text-[#0B1F3A]"
        >
          Marque
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.brand ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.brand && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {brands.map((b) => (
              <label
                key={b.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onBrandChange([...selectedBrands, b.value])
                    } else {
                      onBrandChange(
                        selectedBrands.filter((v) => v !== b.value)
                      )
                    }
                  }}
                  className="rounded border-[#E2E8F4] text-[#0B1F3A] focus:ring-[#2354A4]"
                />
                <span className="text-sm text-[#0B1F3A]">{b.label}</span>
                {b.count !== undefined && (
                  <span className="text-xs text-[#6B7A99] ml-auto">
                    ({b.count})
                  </span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-sm font-bold text-[#0B1F3A]"
        >
          Catégorie
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.category ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.category && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {categories.map((c) => (
              <label
                key={c.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onCategoryChange([...selectedCategories, c.value])
                    } else {
                      onCategoryChange(
                        selectedCategories.filter((v) => v !== c.value)
                      )
                    }
                  }}
                  className="rounded border-[#E2E8F4] text-[#0B1F3A] focus:ring-[#2354A4]"
                />
                <span className="text-sm text-[#0B1F3A]">{c.label}</span>
                {c.count !== undefined && (
                  <span className="text-xs text-[#6B7A99] ml-auto">
                    ({c.count})
                  </span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
