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
          {/* Dense bristles */}
          <svg width="56" height="44" viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Vertical bristle lines — densely packed */}
            <line x1="4" y1="0" x2="3.8" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="6" y1="0" x2="5.9" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="8" y1="0" x2="8.1" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="10" y1="0" x2="9.8" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="12" y1="0" x2="12.2" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="14" y1="0" x2="13.9" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="16" y1="0" x2="16.1" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="18" y1="0" x2="17.8" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="20" y1="0" x2="20.2" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="22" y1="0" x2="21.9" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="24" y1="0" x2="24.1" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="26" y1="0" x2="25.8" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="28" y1="0" x2="28.2" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="30" y1="0" x2="29.9" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="32" y1="0" x2="32.1" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="34" y1="0" x2="33.8" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="36" y1="0" x2="36.2" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="38" y1="0" x2="37.9" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="40" y1="0" x2="40.1" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="42" y1="0" x2="41.8" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="44" y1="0" x2="44.2" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="46" y1="0" x2="45.9" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="48" y1="0" x2="48.1" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="50" y1="0" x2="49.8" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            <line x1="52" y1="0" x2="52.2" y2="38" stroke="url(#bristleGradient)" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
            
            {/* Metal ferrule band */}
            <rect x="2" y="36" width="52" height="8" fill="url(#ferruleGradient)" rx="1" />
            <line x1="2" y1="37" x2="54" y2="37" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <line x1="2" y1="43" x2="54" y2="43" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="bristleGradient" x1="0" y1="0" x2="0" y2="38">
                <stop offset="0%" stopColor="#3d7aa8" />
                <stop offset="50%" stopColor="#2d5f8f" />
                <stop offset="100%" stopColor="#1a4f7a" />
              </linearGradient>
              <linearGradient id="ferruleGradient" x1="0" y1="36" x2="0" y2="44">
                <stop offset="0%" stopColor="#d0d0d0" />
                <stop offset="50%" stopColor="#a8a8a8" />
                <stop offset="100%" stopColor="#808080" />
              </linearGradient>
            </defs>
          </svg>

          {/* Wooden handle */}
          <div
            style={{
              width: 44,
              height: 56,
              background: "linear-gradient(135deg, #d4a574 0%, #c9945f 30%, #b8845c 50%, #a67449 70%, #8f6340 100%)",
              borderRadius: "8px 8px 16px 16px",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3), inset -2px 0 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.35)",
              position: "relative",
              overflow: "hidden",
              marginTop: -2,
            }}
          >
            {/* Wood grain lines */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                rgba(0,0,0,0.05) 2px,
                transparent 4px,
                rgba(255,255,255,0.03) 6px
              )`,
            }} />
            
            {/* Highlight edge */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 4,
              width: 12,
              height: "100%",
              background: "linear-gradient(90deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
            }} />
            
            {/* Hole near bottom */}
            <div style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(0,0,0,0.4))",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
            }} />
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
