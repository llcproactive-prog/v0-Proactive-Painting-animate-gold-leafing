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
          {/* Sash brush bristles — dense and realistic */}
          <svg width="48" height="38" viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bristle base rectangle */}
            <rect x="1" y="0" width="46" height="5" fill="#d4c4b0" rx="2" />
            
            {/* Left edge bristles */}
            <path d="M 4 5 Q 2 10, 1 17 Q 0 25, 2 33 Q 3 36, 4 38" fill="url(#bristle-dark)" />
            <path d="M 7 5 Q 5 11, 4 19 Q 3 27, 5 35 Q 6 37, 7 38" fill="url(#bristle-dark)" />
            
            {/* Left-center bristles */}
            <path d="M 10 5 Q 8 13, 7 22 Q 6 30, 8 37 Q 9 38, 10 38" fill="url(#bristle-medium)" />
            <path d="M 13 5 Q 11 14, 10 24 Q 9 32, 11 38" fill="url(#bristle-medium)" />
            <path d="M 16 5 Q 14 15, 13 26 Q 12 34, 14 38" fill="url(#bristle-light)" />
            
            {/* Center bristles - main mass */}
            <path d="M 19 5 Q 17 16, 16 28 Q 15 35, 17 38" fill="url(#bristle-light)" />
            <path d="M 22 5 Q 20 17, 19 30 Q 18 36, 20 38" fill="url(#bristle-center)" />
            <path d="M 25 5 Q 23 17, 22 30 Q 21 36, 23 38" fill="url(#bristle-center)" />
            <path d="M 28 5 Q 26 16, 25 28 Q 24 35, 26 38" fill="url(#bristle-light)" />
            
            {/* Right-center bristles */}
            <path d="M 31 5 Q 29 15, 28 26 Q 27 34, 29 38" fill="url(#bristle-light)" />
            <path d="M 34 5 Q 32 14, 31 24 Q 30 32, 32 38" fill="url(#bristle-medium)" />
            <path d="M 37 5 Q 35 13, 34 22 Q 33 30, 35 37 Q 36 38, 37 38" fill="url(#bristle-medium)" />
            
            {/* Right edge bristles */}
            <path d="M 40 5 Q 42 11, 43 19 Q 44 27, 42 35 Q 41 37, 40 38" fill="url(#bristle-dark)" />
            <path d="M 43 5 Q 45 10, 46 17 Q 47 25, 45 33 Q 44 36, 43 38" fill="url(#bristle-dark)" />
            
            {/* Subtle highlight */}
            <ellipse cx="24" cy="18" rx="8" ry="12" fill="rgba(255,255,255,0.15)" />
            
            {/* Gradients for depth and realism */}
            <defs>
              <linearGradient id="bristle-dark" x1="0" y1="0" x2="0" y2="38">
                <stop offset="0%" stopColor="#5a9acc" />
                <stop offset="35%" stopColor="#3d7aa8" />
                <stop offset="70%" stopColor="#2d5f8f" />
                <stop offset="100%" stopColor="#1f4566" />
              </linearGradient>
              <linearGradient id="bristle-medium" x1="0" y1="0" x2="0" y2="38">
                <stop offset="0%" stopColor="#6b9fce" />
                <stop offset="35%" stopColor="#4a90c4" />
                <stop offset="70%" stopColor="#2d6ea8" />
                <stop offset="100%" stopColor="#1a4f7a" />
              </linearGradient>
              <linearGradient id="bristle-light" x1="0" y1="0" x2="0" y2="38">
                <stop offset="0%" stopColor="#7daad4" />
                <stop offset="35%" stopColor="#5a9acc" />
                <stop offset="70%" stopColor="#3d7aa8" />
                <stop offset="100%" stopColor="#2d5f8f" />
              </linearGradient>
              <linearGradient id="bristle-center" x1="0" y1="0" x2="0" y2="38">
                <stop offset="0%" stopColor="#5a9acc" />
                <stop offset="40%" stopColor="#3d7aa8" />
                <stop offset="75%" stopColor="#2d6ea8" />
                <stop offset="100%" stopColor="#1a4f7a" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Wooden brush handle */}
          <div
            style={{
              width: 32,
              height: 48,
              background: "linear-gradient(90deg, #8b6f47 0%, #a88c5d 40%, #9d7d52 60%, #7a5f3f 100%)",
              borderRadius: "4px 4px 2px 2px",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), inset -1px 0 1px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
              marginTop: -2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Wood grain texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 20%, transparent 40%, rgba(0,0,0,0.06) 60%, transparent 80%, rgba(255,255,255,0.1) 100%)`,
                backgroundSize: "100% 100%",
              }}
            />
            {/* Subtle highlight edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                width: "20%",
                height: "100%",
                background: "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
              }}
            />
          </div>
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
