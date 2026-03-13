export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NOVATECH.MA",
          url: "https://novatech.ma",
          logo: "https://novatech.ma/logo.svg",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+212661530307",
            contactType: "customer service",
            areaServed: "MA",
            availableLanguage: ["French", "Arabic"],
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "MA",
            addressRegion: "Casablanca",
          },
          sameAs: [
            "https://www.facebook.com/novatechma",
            "https://www.instagram.com/novatechma",
            "https://www.tiktok.com/@novatechma",
          ],
        }),
      }}
    />
  )
}
