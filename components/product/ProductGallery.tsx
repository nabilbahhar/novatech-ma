"use client"

import Image from "next/image"
import { useState, useRef, useCallback } from "react"
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  mainImage: string | null
}

export function ProductGallery({ images, mainImage }: ProductGalleryProps) {
  const allImages = mainImage
    ? [mainImage, ...(images || []).filter((img) => img !== mainImage)]
    : images || []
  const [selected, setSelected] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setZoomPosition({ x, y })
    },
    [isZoomed]
  )

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev)
    setZoomLevel(isZoomed ? 1 : 2.5)
  }, [isZoomed])

  const handlePrev = useCallback(() => {
    setSelected((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
  }, [allImages.length])

  const handleNext = useCallback(() => {
    setSelected((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
  }, [allImages.length])

  if (!allImages.length) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F4] flex items-center justify-center h-[400px] md:h-[500px]">
        <div className="text-center text-[#6B7A99]">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F7F9FC] flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-[#C0CAD8]" />
          </div>
          <p className="text-lg font-semibold">Image non disponible</p>
          <p className="text-sm mt-1">Photo bientôt ajoutée</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main image with zoom */}
        <div
          ref={containerRef}
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isZoomed && setIsZoomed(false)}
          className={`relative bg-white rounded-xl border border-[#E2E8F4] flex items-center justify-center p-6 h-[400px] md:h-[500px] overflow-hidden group ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev() }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 border border-[#E2E8F4] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 text-[#0B1F3A]" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext() }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 border border-[#E2E8F4] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
              >
                <ChevronRight className="w-5 h-5 text-[#0B1F3A]" />
              </button>
            </>
          )}

          {/* Zoom indicator */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/80 rounded-lg px-2.5 py-1.5 text-xs text-[#6B7A99] opacity-0 group-hover:opacity-100 transition-opacity border border-[#E2E8F4]">
            {isZoomed ? (
              <>
                <ZoomOut className="w-3.5 h-3.5" />
                Cliquez pour dézoomer
              </>
            ) : (
              <>
                <ZoomIn className="w-3.5 h-3.5" />
                Cliquez pour zoomer
              </>
            )}
          </div>

          {/* Fullscreen button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsLightboxOpen(true)
            }}
            className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-lg bg-white/80 border border-[#E2E8F4] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
            title="Plein écran"
          >
            <svg className="w-4 h-4 text-[#0B1F3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Image counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 left-3 z-10 bg-white/80 rounded-lg px-2.5 py-1 text-xs text-[#6B7A99] border border-[#E2E8F4]">
              {selected + 1} / {allImages.length}
            </div>
          )}

          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-200"
            style={
              isZoomed
                ? {
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : undefined
            }
          >
            <Image
              src={allImages[selected]}
              alt="Product"
              width={800}
              height={800}
              className="object-contain max-h-full w-auto select-none"
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex-shrink-0 w-[72px] h-[72px] bg-white rounded-lg border-2 p-1.5 transition-all ${
                  selected === i
                    ? "border-[#2354A4] shadow-md"
                    : "border-[#E2E8F4] hover:border-[#2354A4]/50"
                }`}
              >
                <Image
                  src={img}
                  alt={`Vue ${i + 1}`}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox (fullscreen) */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation in lightbox */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Image counter in lightbox */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-white/10 rounded-full px-4 py-2 text-sm text-white">
              {selected + 1} / {allImages.length}
            </div>
          )}

          {/* Lightbox image */}
          <div
            className="relative w-[90vw] h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[selected]}
              alt="Product fullscreen"
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
