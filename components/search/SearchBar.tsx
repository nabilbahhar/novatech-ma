"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { SearchResults } from "./SearchResults"
import type { Product } from "@/types"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setOpen(false)
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=6`)
        if (res.ok) {
          const data = await res.json()
          setResults(data.products || [])
          setOpen(true)
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setOpen(false)
      router.push(`/catalogue?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A99]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un produit, une marque..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#F7F9FC] border border-[#E2E8F4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2354A4]/30 focus:border-[#2354A4] transition-all placeholder:text-[#6B7A99]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setOpen(false)
                inputRef.current?.focus()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7A99] hover:text-[#0B1F3A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 z-50">
            <SearchResults
              results={results}
              loading={loading}
              query={query}
              onClose={() => setOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  )
}
