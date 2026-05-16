"use client"

import { useState, useRef, useCallback } from "react"

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  label?: string
  beforeLabel?: string
  afterLabel?: string
}

// An SVG brushstroke path used as the clipping mask edge.
// It's a wavy, irregular vertical stroke that mimics a loaded paintbrush dragged across canvas.
const BRUSH_WIDTH = 28 // px of the feathered overlap zone

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label = "Before / After",
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const active = isDragging || isHovered

  return (
    <div
      ref={containerRef}
      className="relative aspect-square overflow-hidden rounded-md select-none cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { handleMouseUp(); setIsHovered(false) }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image — full background */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image — clipped by brushstroke polygon */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(
            0% 0%,
            calc(${sliderPosition}% + 6px) 0%,
            calc(${sliderPosition}% + 10px) 4%,
            calc(${sliderPosition}% + 5px) 9%,
            calc(${sliderPosition}% + 12px) 15%,
            calc(${sliderPosition}% + 8px) 21%,
            calc(${sliderPosition}% + 14px) 28%,
            calc(${sliderPosition}% + 6px) 34%,
            calc(${sliderPosition}% + 11px) 40%,
            calc(${sliderPosition}% + 4px) 46%,
            calc(${sliderPosition}% + 13px) 52%,
            calc(${sliderPosition}% + 7px) 58%,
            calc(${sliderPosition}% + 10px) 64%,
            calc(${sliderPosition}% + 3px) 70%,
            calc(${sliderPosition}% + 9px) 76%,
            calc(${sliderPosition}% + 6px) 82%,
            calc(${sliderPosition}% + 11px) 88%,
            calc(${sliderPosition}% + 4px) 94%,
            calc(${sliderPosition}% + 7px) 100%,
            0% 100%
          )`,
        }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Brushstroke divider SVG — decorative vertical stroke */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        preserveAspectRatio="none"
        viewBox="0 0 100 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 0 6px rgba(0,0,0,0.35))",
          opacity: active ? 1 : 0.85,
          transition: "opacity 0.2s ease",
        }}
      >
        <path
          d={`
            M ${sliderPosition + 0.6} 0
            C ${sliderPosition + 1.2} 16, ${sliderPosition - 0.5} 30, ${sliderPosition + 1.0} 42
            C ${sliderPosition + 2.0} 58, ${sliderPosition - 0.8} 72, ${sliderPosition + 0.5} 86
            C ${sliderPosition + 1.5} 102, ${sliderPosition - 1.0} 116, ${sliderPosition + 0.8} 130
            C ${sliderPosition + 1.8} 148, ${sliderPosition - 0.6} 162, ${sliderPosition + 1.0} 176
            C ${sliderPosition + 2.2} 194, ${sliderPosition - 1.2} 208, ${sliderPosition + 0.4} 224
            C ${sliderPosition + 1.6} 242, ${sliderPosition - 0.8} 256, ${sliderPosition + 1.2} 270
            C ${sliderPosition + 2.0} 288, ${sliderPosition - 0.4} 302, ${sliderPosition + 0.8} 318
            C ${sliderPosition + 1.4} 334, ${sliderPosition - 1.0} 350, ${sliderPosition + 0.6} 368
            C ${sliderPosition + 1.2} 382, ${sliderPosition - 0.5} 392, ${sliderPosition + 0.8} 400
          `}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth={active ? "2.2" : "1.8"}
          strokeLinecap="round"
          style={{ transition: "stroke-width 0.2s ease" }}
        />
      </svg>

      {/* Basic slider handle */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${sliderPosition}%`, top: "50%" }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => { handleMouseDown(e as any); }}
      >
        <div
          className="w-8 h-8 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform duration-200"
          style={{
            transform: active ? "scale(1.15)" : "scale(1)",
            boxShadow: active ? "0 4px 12px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          <svg className="w-4 h-4 text-[#3a342c]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 19l7-7-7-7" />
          </svg>
        </div>
      </div>

      {/* Before/After labels */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
        <span
          className="text-[#f8f3e9] px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] tracking-widest uppercase font-bold rounded-full"
          style={{ background: "rgba(45,110,168,0.88)", backdropFilter: "blur(4px)" }}
        >
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
        <span
          className="text-[#f8f3e9] px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] tracking-widest uppercase font-bold rounded-full"
          style={{ background: "rgba(45,110,168,0.65)", backdropFilter: "blur(4px)" }}
        >
          {afterLabel}
        </span>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[rgba(26,79,122,0.65)] to-transparent z-10">
        <span className="text-[#f8f3e9] text-xs tracking-widest uppercase font-bold">
          {label}
        </span>
      </div>
    </div>
  )
}
