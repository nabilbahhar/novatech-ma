"use client"

import Image from "next/image"
import { useState } from "react"

interface ProductGalleryProps {
  images: string[]
  mainImage: string | null
}

export function ProductGallery({ images, mainImage }: ProductGalleryProps) {
  const allImages = mainImage
    ? [mainImage, ...(images || []).filter((img) => img !== mainImage)]
    : images || []
  const [selected, setSelected] = useState(0)

  if (!allImages.length) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F4] flex items-center justify-center h-[400px]">
        <div className="text-center text-[#6B7A99]">
          <p className="text-lg font-semibold">Image non disponible</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="bg-white rounded-xl border border-[#E2E8F4] flex items-center justify-center p-6 h-[400px]">
        <Image
          src={allImages[selected]}
          alt="Product"
          width={600}
          height={600}
          className="object-contain max-h-full w-auto"
          priority
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-16 h-16 bg-white rounded-lg border-2 p-1 transition-colors ${
                selected === i
                  ? "border-[#2354A4]"
                  : "border-[#E2E8F4] hover:border-[#2354A4]/50"
              }`}
            >
              <Image
                src={img}
                alt={`View ${i + 1}`}
                width={60}
                height={60}
                className="object-contain w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
