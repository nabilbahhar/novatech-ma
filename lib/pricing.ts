interface PriceResult {
  priceHT: number
  priceTTC: number
  priceCrossed: number | null
  priceEconomy: number | null
  badgeBestPrice: boolean
}

const MARGINS: Record<string, number> = {
  ordinateurs: 0.1,
  ecrans: 0.12,
  accessoires: 0.18,
  audio: 0.2,
  bagagerie: 0.22,
  impression: 0.15,
  reseau: 0.18,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function computePrice(benchmarkTTC: number, category: string): PriceResult {
  const raw = benchmarkTTC * 0.96
  const priceTTC = Math.ceil(raw / 100) * 100 - 10

  return {
    priceHT: Math.round(priceTTC / 1.2),
    priceTTC,
    priceCrossed: benchmarkTTC > priceTTC ? Math.round(benchmarkTTC) : null,
    priceEconomy: benchmarkTTC > priceTTC ? Math.round(benchmarkTTC - priceTTC) : null,
    badgeBestPrice: true,
  }
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fr-MA") + " DH"
}

export function getMargin(category: string): number {
  return MARGINS[category] || 0.15
}
