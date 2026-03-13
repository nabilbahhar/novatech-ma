"use client"

export default function AdminQuotesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
        Demandes de devis
      </h1>
      <div className="bg-white rounded-xl border border-[#E2E8F4] p-8 text-center">
        <p className="text-[#6B7A99]">Aucune demande de devis pour le moment.</p>
        <p className="text-sm text-[#6B7A99] mt-1">
          Les demandes apparaîtront ici dès qu&apos;une entreprise en soumettra une.
        </p>
      </div>
    </div>
  )
}
