const IMAGE_SOURCES: Record<string, (sku: string) => string> = {
  dell: (sku: string) =>
    `https://i.dell.com/is/image/DellContent/${sku}?fmt=jpg&wid=600&hei=600`,
  jabra: (sku: string) =>
    `https://www.jabra.com/~/media/Images/Products/${sku}`,
  lenovo: (model: string) =>
    `https://psref.lenovo.com/syspool/Sys/Image/LenovoLogo/${model}`,
}

async function checkImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" })
    return res.ok && (res.headers.get("content-type")?.includes("image") ?? false)
  } catch {
    return false
  }
}

async function bingImageSearch(query: string): Promise<string | null> {
  const apiKey = process.env.BING_IMAGE_SEARCH_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(
      `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=3&imageType=Product`,
      { headers: { "Ocp-Apim-Subscription-Key": apiKey } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const results = data.value || []
    for (const img of results) {
      if (img.thumbnail?.width >= 300) {
        return img.contentUrl
      }
    }
  } catch {
    return null
  }
  return null
}

export async function getProductImage(
  sku: string,
  brand: string,
  title: string
): Promise<string> {
  const brandFn = IMAGE_SOURCES[brand.toLowerCase()]
  if (brandFn) {
    const url = brandFn(sku)
    const ok = await checkImageUrl(url)
    if (ok) return url
  }

  const bingUrl = await bingImageSearch(
    `${brand} ${title} official product image white background`
  )
  if (bingUrl) return bingUrl

  return `/api/placeholder?text=${encodeURIComponent(title)}&brand=${brand}`
}
