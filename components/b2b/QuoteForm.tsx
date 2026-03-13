"use client"

import { useState } from "react"
import { MessageCircle, Send } from "lucide-react"
import { generateWhatsAppLink } from "@/lib/whatsapp"

export function QuoteForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    ice: "",
    city: "",
    projectType: "",
    details: "",
  })

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: form.company,
          contact_name: form.contact,
          contact_email: form.email,
          contact_phone: form.phone,
          ice_number: form.ice,
          city: form.city,
          project_type: form.projectType,
          notes: form.details,
        }),
      })

      if (res.ok) {
        setSuccess(true)
      }
    } catch {
      // handle error
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-8 text-center">
        <div className="w-16 h-16 bg-[#00B87A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-[#00B87A]" />
        </div>
        <h2 className="text-xl font-bold text-[#0B1F3A] mb-2">
          Demande envoyée !
        </h2>
        <p className="text-[#6B7A99] mb-6">
          Nous vous recontacterons sous 2 heures avec votre devis.
        </p>
        <a
          href={generateWhatsAppLink({
            type: "quote",
            company: form.company,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da853] text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Accélérer via WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <h2 className="font-bold text-[#0B1F3A] mb-4">
          Informations entreprise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Raison sociale *
            </label>
            <input
              type="text"
              required
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
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
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Contact *
            </label>
            <input
              type="text"
              required
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
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
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
            />
          </div>
          <div>
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
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Ville
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F4] p-6">
        <h2 className="font-bold text-[#0B1F3A] mb-4">Besoin</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Type de projet
            </label>
            <select
              value={form.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
            >
              <option value="">Sélectionner</option>
              <option value="workstations">Postes de travail</option>
              <option value="datacenter">Data Center / Serveurs</option>
              <option value="reseau">Réseau / Switches</option>
              <option value="audio">Audio / Visioconférence</option>
              <option value="securite">Sécurité</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
              Détails de votre besoin *
            </label>
            <textarea
              required
              rows={4}
              value={form.details}
              onChange={(e) => update("details", e.target.value)}
              placeholder="Décrivez votre besoin : quantités, modèles, budget, délais..."
              className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#0B1F3A] hover:bg-[#112D54] text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer la demande de devis"}
        </button>
        <a
          href={generateWhatsAppLink({
            type: "quote",
            company: form.company,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da853] text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </form>
  )
}
