"use client"

import { useEffect, useState } from "react"

interface AnnouncementBarProps {
  items: string[]
}

export function AnnouncementBar({ items }: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="bg-[#0B1F3A] text-white text-xs font-medium py-2 text-center overflow-hidden">
      <div className="flex items-center justify-center gap-2">
        <span className="transition-opacity duration-300">
          {items[currentIndex]}
        </span>
      </div>
    </div>
  )
}
