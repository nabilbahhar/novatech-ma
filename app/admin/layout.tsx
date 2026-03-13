"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FileText,
  LogOut,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/produits", icon: Package, label: "Produits" },
  { href: "/admin/commandes", icon: ShoppingBag, label: "Commandes" },
  { href: "/admin/devis", icon: FileText, label: "Devis" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token")
    if (token) setAuthenticated(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password) {
      sessionStorage.setItem("admin_token", "authenticated")
      setAuthenticated(true)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl border border-[#E2E8F4] p-8 w-full max-w-sm"
        >
          <h1 className="font-display text-xl font-bold text-[#0B1F3A] mb-6 text-center">
            NOVATECH Admin
          </h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#E2E8F4] rounded-lg text-sm mb-4 focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#0B1F3A] text-white font-bold py-2.5 rounded-lg hover:bg-[#112D54] transition-colors"
          >
            Connexion
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0B1F3A] text-white flex flex-col">
        <div className="p-4 border-b border-white/10">
          <span className="font-display text-lg font-bold">
            NOVA<span className="text-[#D42B3A]">TECH</span>
          </span>
          <p className="text-[10px] text-white/50 mt-0.5">Administration</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white font-semibold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={() => {
            sessionStorage.removeItem("admin_token")
            setAuthenticated(false)
          }}
          className="flex items-center gap-2 px-6 py-3 text-sm text-white/50 hover:text-white border-t border-white/10"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  )
}
