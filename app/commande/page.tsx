"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
          Finaliser la commande
        </h1>
        <CheckoutForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
