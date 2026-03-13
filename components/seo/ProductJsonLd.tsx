import type { Product } from "@/types"

export function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title_commercial,
    description: product.description_short,
    image: product.image_gallery?.length
      ? product.image_gallery
      : product.image_main
        ? [product.image_main]
        : [],
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: product.price_ttc,
      priceValidUntil: new Date(Date.now() + 30 * 86400000)
        .toISOString()
        .split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock_qty > 0
          ? "https://schema.org/InStock"
          : product.stock_incoming > 0
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
      url: `https://novatech.ma/produit/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "NOVATECH.MA",
        url: "https://novatech.ma",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MA",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
