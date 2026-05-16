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

      {/* Paintbrush handle */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${sliderPosition}%`, top: "50%" }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => { handleMouseDown(e as any); }}
      >
        <div
          className="relative flex flex-col items-center"
          style={{
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.45))",
            transform: active ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
        >
          {/* Brush ferrule (metal band) */}
          <div
            className="rounded-sm flex items-center justify-center"
            style={{
              width: 40,
              height: 16,
              background: "linear-gradient(180deg, #e8e0d0 0%, #c8b89a 50%, #b8a882 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)",
            }}
          >
            <div className="w-full border-t border-[rgba(0,0,0,0.15)]" />
          </div>
          {/* Sash brush bristles — wide and flat */}
          <svg width="44" height="32" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bristle base rectangle */}
            <rect x="2" y="0" width="40" height="4" fill="#c9b8a0" rx="1" />
            {/* Left bristle group */}
            <path d="M 8 4 Q 6 8, 5 14 Q 4 20, 6 28 Q 7 31, 8 32"
              fill="url(#sash-grad-left)" />
            <path d="M 12 4 Q 10 9, 9 16 Q 8 23, 10 30 Q 11 31, 12 32"
              fill="url(#sash-grad-left)" />
            {/* Center bristle group */}
            <path d="M 16 4 Q 14 10, 13 18 Q 12 26, 14 32"
              fill="url(#sash-grad-center)" />
            <path d="M 22 4 Q 24 10, 25 18 Q 26 26, 24 32"
              fill="url(#sash-grad-center)" />
            {/* Right bristle group */}
            <path d="M 32 4 Q 34 9, 35 16 Q 36 23, 34 30 Q 33 31, 32 32"
              fill="url(#sash-grad-right)" />
            <path d="M 36 4 Q 38 8, 39 14 Q 40 20, 38 28 Q 37 31, 36 32"
              fill="url(#sash-grad-right)" />
            {/* Highlight on bristles */}
            <ellipse cx="18" cy="16" rx="6" ry="10" fill="rgba(255,255,255,0.2)" />
            <defs>
              <linearGradient id="sash-grad-left" x1="0" y1="0" x2="0" y2="32">
                <stop offset="0%" stopColor="#5a9acc" />
                <stop offset="50%" stopColor="#3d7aa8" />
                <stop offset="100%" stopColor="#2d5f8f" />
              </linearGradient>
              <linearGradient id="sash-grad-center" x1="0" y1="0" x2="0" y2="32">
                <stop offset="0%" stopColor="#4a90c4" />
                <stop offset="50%" stopColor="#2d6ea8" />
                <stop offset="100%" stopColor="#1a4f7a" />
              </linearGradient>
              <linearGradient id="sash-grad-right" x1="0" y1="0" x2="0" y2="32">
                <stop offset="0%" stopColor="#3d7faa" />
                <stop offset="50%" stopColor="#2a5a8a" />
                <stop offset="100%" stopColor="#1a3f66" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Before/After labels */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="text-[#f8f3e9] px-2.5 py-1 text-[10px] tracking-widest uppercase font-bold rounded-full"
          style={{ background: "rgba(45,110,168,0.88)", backdropFilter: "blur(4px)" }}
        >
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span
          className="text-[#f8f3e9] px-2.5 py-1 text-[10px] tracking-widest uppercase font-bold rounded-full"
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
