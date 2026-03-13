"use client"

import { useState } from "react"

interface OrderSummary {
  id: number
  order_number: string
  customer_name: string
  customer_phone: string
  total_ttc: number
  status: string
  created_at: string
}

export default function AdminOrdersPage() {
  const [orders] = useState<OrderSummary[]>([])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
        Commandes
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F4] p-8 text-center">
          <p className="text-[#6B7A99]">Aucune commande pour le moment.</p>
          <p className="text-sm text-[#6B7A99] mt-1">
            Les commandes apparaîtront ici dès qu&apos;un client passera commande.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E2E8F4] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F9FC] text-left">
                <th className="px-4 py-3 font-semibold text-[#6B7A99]">N°</th>
                <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                  Client
                </th>
                <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                  Total
                </th>
                <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                  Statut
                </th>
                <th className="px-4 py-3 font-semibold text-[#6B7A99]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-t border-[#E2E8F4] hover:bg-[#F7F9FC]"
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {o.order_number}
                  </td>
                  <td className="px-4 py-3">{o.customer_name}</td>
                  <td className="px-4 py-3 font-bold text-[#D42B3A]">
                    {o.total_ttc?.toLocaleString("fr-MA")} DH
                  </td>
                  <td className="px-4 py-3">{o.status}</td>
                  <td className="px-4 py-3 text-[#6B7A99]">
                    {new Date(o.created_at).toLocaleDateString("fr-MA")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
