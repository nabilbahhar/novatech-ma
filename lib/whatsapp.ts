const WA = process.env.NEXT_PUBLIC_WA_NUMBER || "212661530307"

type WaContext =
  | { type: "general" }
  | { type: "product"; productName: string; productSku: string }
  | { type: "cart"; items: { name: string; qty: number; price: number }[]; total: number }
  | { type: "quote"; company?: string }
  | { type: "stock"; productName: string }

export function generateWhatsAppLink(ctx: WaContext): string {
  let msg = ""

  switch (ctx.type) {
    case "product":
      msg = `Bonjour NOVATECH.MA\n\nJe suis intéressé par :\n\n*${ctx.productName}*\nRéf : ${ctx.productSku}\n\nPouvez-vous me confirmer la disponibilité et le délai de livraison ?\n\nMerci`
      break
    case "cart": {
      const list = ctx.items
        .map(
          (i) =>
            `• ${i.name} × ${i.qty}  →  ${i.price.toLocaleString("fr-MA")} DH`
        )
        .join("\n")
      msg = `Bonjour NOVATECH.MA\n\nJe souhaite commander :\n\n${list}\n\n*Total TTC : ${ctx.total.toLocaleString("fr-MA")} DH*\n\nMerci de confirmer et d'indiquer les délais de livraison.`
      break
    }
    case "quote":
      msg = `Bonjour NOVATECH.MA\n\nJe représente *${ctx.company || "mon entreprise"}* et je souhaite obtenir un devis professionnel pour du matériel informatique.\n\nPouvez-vous me contacter ?\n\nMerci`
      break
    case "stock":
      msg = `Bonjour NOVATECH.MA\n\nJe souhaite être informé du retour en stock de :\n*${ctx.productName}*\n\nMerci`
      break
    default:
      msg = `Bonjour NOVATECH.MA\n\nJ'ai besoin d'information sur votre catalogue de matériel informatique.\n\nMerci`
  }

  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
}
