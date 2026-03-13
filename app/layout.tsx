import type { Metadata } from "next"
import { DM_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://novatech.ma"),
  title: {
    default: "NOVATECH.MA — Matériel Informatique Maroc",
    template: "%s | NOVATECH.MA",
  },
  description:
    "Achetez votre matériel informatique Dell, Jabra, Lenovo au meilleur prix au Maroc. Stock disponible, livraison rapide, paiement à la livraison.",
  keywords: [
    "matériel informatique Maroc",
    "ordinateur portable Maroc",
    "Dell Maroc",
    "Jabra Maroc",
    "achat informatique en ligne Maroc",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://novatech.ma",
    siteName: "NOVATECH.MA",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "https://novatech.ma" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-[#F7F9FC] text-[#071426]">
        {children}
      </body>
    </html>
  )
}
