"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/pricing"

const CITIES = [
  "Casablanca",
  "Rabat",
  "Tanger",
  "Marrakech",
  "Fès",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "Autre",
]

export function CheckoutForm() {
  const { items, totalHT, totalTTC, clear } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    payment: "cash_on_delivery" as "cash_on_delivery" | "cmi",
    notes: "",
    isB2B: false,
    companyName: "",
    ice: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          customer_city: form.city,
          delivery_address: form.address,
          payment_method: form.payment,
          notes: form.notes,
          is_b2b: form.isB2B,
          company_name: form.companyName,
          ice_number: form.ice,
          items: items.map((i) => ({
            sku: i.sku,
            title: i.title_commercial,
            qty: i.qty,
            price_ht: i.price_ht,
            price_ttc: i.price_ttc,
          })),
          subtotal_ht: totalHT(),
          total_ttc: totalTTC(),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        clear()
        router.push(
          `/commande/confirmation?order=${data.order_number}`
        )
      }
    } catch {
      // handle error
    } finally {
      setLoading(false)
    }
  }

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <h2 className="font-bold text-[#0B1F3A] mb-4">
          Informations de contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Téléphone *
            </label>
            <input
              type="tel"
              required
              placeholder="+212 6XX XXX XXX"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <h2 className="font-bold text-[#0B1F3A] mb-4">Livraison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Ville *
            </label>
            <select
              required
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
            >
              <option value="">Sélectionner une ville</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Adresse de livraison *
            </label>
            <textarea
              required
              rows={2}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <h2 className="font-bold text-[#0B1F3A] mb-4">Paiement</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border border-[#E2E8F4] rounded-lg cursor-pointer hover:bg-[#F7F9FC]">
            <input
              type="radio"
              name="payment"
              value="cash_on_delivery"
              checked={form.payment === "cash_on_delivery"}
              onChange={(e) => update("payment", e.target.value)}
              className="text-[#0B1F3A]"
            />
            <div>
              <p className="text-sm font-semibold text-[#0B1F3A]">
                Paiement à la livraison
              </p>
              <p className="text-xs text-[#6B7A99]">
                Payez en espèces lors de la réception
              </p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border border-[#E2E8F4] rounded-lg cursor-pointer hover:bg-[#F7F9FC]">
            <input
              type="radio"
              name="payment"
              value="cmi"
              checked={form.payment === "cmi"}
              onChange={(e) => update("payment", e.target.value)}
              className="text-[#0B1F3A]"
            />
            <div>
              <p className="text-sm font-semibold text-[#0B1F3A]">
                Carte bancaire (CMI)
              </p>
              <p className="text-xs text-[#6B7A99]">
                Visa, Mastercard — paiement sécurisé
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* B2B */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isB2B}
            onChange={(e) => update("isB2B", e.target.checked)}
            className="rounded text-[#0B1F3A]"
          />
          <span className="text-sm font-semibold text-[#0B1F3A]">
            Commande entreprise (avec facture)
          </span>
        </label>

        {form.isB2B && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
                Raison sociale
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
                ICE
              </label>
              <input
                type="text"
                value={form.ice}
                onChange={(e) => update("ice", e.target.value)}
                className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
          Notes (optionnel)
        </label>
        <textarea
          rows={2}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Instructions spéciales de livraison..."
          className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none resize-none"
        />
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-[#6B7A99]">
            <span>Sous-total HT</span>
            <span>{formatPrice(totalHT())}</span>
          </div>
          <div className="flex justify-between text-sm text-[#6B7A99]">
            <span>TVA (20%)</span>
            <span>{formatPrice(totalTTC() - totalHT())}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-[#0B1F3A] pt-2 border-t border-[#E2E8F4]">
            <span>Total TTC</span>
            <span className="text-[#D42B3A]">{formatPrice(totalTTC())}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D42B3A] hover:bg-[#A81F2C] text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Traitement..." : "Confirmer la commande"}
        </button>
      </div>
    </form>
  )
}
