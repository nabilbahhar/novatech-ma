"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, MessageCircle, ArrowLeft } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F9FC]" />}>
      <ConfirmationContent />
    </Suspense>
  )
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-[#00B87A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#00B87A]" />
        </div>

        <h1 className="font-display text-3xl font-bold text-[#0B1F3A] mb-3">
          Commande confirmée !
        </h1>

        {orderNumber && (
          <p className="text-lg text-[#6B7A99] mb-2">
            Numéro de commande :{" "}
            <span className="font-bold text-[#0B1F3A]">{orderNumber}</span>
          </p>
        )}

        <p className="text-[#6B7A99] mb-8">
          Nous avons bien reçu votre commande. Vous recevrez une confirmation
          par téléphone dans les prochaines heures.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#112D54] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuer les achats
          </Link>
          <a
            href={`https://wa.me/212661530307?text=${encodeURIComponent(
              `Bonjour NOVATECH.MA\n\nJe souhaite suivre ma commande ${orderNumber || ""}.\n\nMerci`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da853] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Suivre via WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
