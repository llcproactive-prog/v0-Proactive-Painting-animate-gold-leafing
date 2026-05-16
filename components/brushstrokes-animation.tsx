"use client"

import { useEffect, useRef } from "react"

interface BrushStroke {
  points: { x: number; y: number; pressure: number }[]
  color: string
  maxWidth: number
  opacity: number
  progress: number
  speed: number
  direction: number
}

export function BrushstrokesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const strokesRef = useRef<BrushStroke[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Brand colors - warm painting tones
    const colors = ["#c97954", "#d4af37", "#6e7d5e", "#e8b4a8", "#b8860b"]

    function generateBrushPath(startX: number, startY: number, direction: number): { x: number; y: number; pressure: number }[] {
      const points: { x: number; y: number; pressure: number }[] = []
      let x = startX
      let y = startY
      const segments = Math.floor(Math.random() * 100) + 120
      
      let pressure = 0
      let brushLoad = 1.0
      const waveFrequency = Math.random() * 0.04 + 0.02
      const amplitude = Math.random() * 60 + 80

      for (let i = 0; i < segments; i++) {
        const t = i / segments
        
        // Smooth pressure envelope: soft start, strong middle, soft taper
        if (t < 0.08) {
          pressure = Math.pow(t / 0.08, 0.8) // Smooth initial touch
        } else if (t < 0.92) {
          // Main stroke with paint depletion simulation
          pressure = 0.8 + Math.sin(i * 0.15) * 0.15 + Math.random() * 0.08
          brushLoad -= 0.005
          if (brushLoad < 0.3) {
            brushLoad = 0.9 // Reload
          }
        } else {
          // Smooth taper at end
          pressure = (1 - t) * 5 + Math.random() * 0.05
        }

        points.push({ x, y, pressure: Math.max(0.02, Math.min(0.95, pressure)) })
        
        // Organic flowing curves - like water flowing
        const waveMod = Math.sin(i * waveFrequency) * amplitude * 0.08
        const driftMod = Math.sin(i * 0.015) * 25 * 0.1
        const turbulence = (Math.random() - 0.5) * 20
        
        x += (10 + Math.random() * 6) * direction
        y += waveMod + driftMod + turbulence * 0.05
      }

      return points
    }

    function createStroke(): BrushStroke {
      const direction = Math.random() > 0.5 ? 1 : -1
      const startX = direction > 0 ? -50 : canvas.width + 50
      const startY = Math.random() * canvas.height * 0.7 + canvas.height * 0.15

      return {
        points: generateBrushPath(startX, startY, direction),
        color: colors[Math.floor(Math.random() * colors.length)],
        maxWidth: Math.random() * 25 + 15,
        opacity: Math.random() * 0.12 + 0.04,
        progress: 0,
        speed: Math.random() * 0.006 + 0.003,
        direction,
      }
    }

    // Initialize with strokes
    strokesRef.current = Array.from({ length: 3 }, () => createStroke())

    function drawBrushStroke(ctx: CanvasRenderingContext2D, stroke: BrushStroke) {
      if (stroke.points.length < 2) return

      const pointsToDraw = Math.floor(stroke.points.length * stroke.progress)
      if (pointsToDraw < 2) return

      ctx.save()
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw main stroke with smooth Catmull-Rom spline interpolation
      for (let i = 1; i < pointsToDraw; i++) {
        const points = stroke.points
        const curr = points[i]
        const prev = points[i - 1]
        
        // Width modulation based on pressure
        const width = stroke.maxWidth * curr.pressure
        
        // Main brushstroke with transparency gradient
        const fadeIn = Math.min(1, i / 5)
        const fadeOut = i > pointsToDraw - 10 ? (pointsToDraw - i) / 10 : 1
        const alpha = stroke.opacity * fadeIn * fadeOut * (0.6 + curr.pressure * 0.4)
        
        ctx.globalAlpha = alpha
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = width
        
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(curr.x, curr.y)
        ctx.stroke()

        // Double-stroke for texture depth
        if (curr.pressure > 0.4 && Math.random() > 0.75) {
          ctx.globalAlpha = alpha * 0.4
          ctx.lineWidth = width * 0.3
          const offset = (Math.random() - 0.5) * width * 0.4
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y + offset)
          ctx.lineTo(curr.x, curr.y + offset)
          ctx.stroke()
        }

        // Wet paint highlight on edge
        if (curr.pressure > 0.3) {
          ctx.globalAlpha = alpha * 0.15
          ctx.strokeStyle = "#fef9f0"
          ctx.lineWidth = width * 0.15
          ctx.beginPath()
          ctx.moveTo(prev.x - width * 0.3, prev.y)
          ctx.lineTo(curr.x - width * 0.3, curr.y)
          ctx.stroke()
        }
      }

      // Paint pooling at stroke end
      if (pointsToDraw > 3) {
        const lastPoint = stroke.points[pointsToDraw - 1]
        if (lastPoint.pressure > 0.25) {
          ctx.globalAlpha = stroke.opacity * 0.35
          ctx.fillStyle = stroke.color
          const poolSize = stroke.maxWidth * lastPoint.pressure * 0.5
          ctx.beginPath()
          ctx.ellipse(lastPoint.x, lastPoint.y, poolSize * 0.8, poolSize * 0.5, 0, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.restore()
    }

    function animate() {
      // Subtle continuous fade for smooth blending
      ctx.fillStyle = "rgba(248, 243, 233, 0.008)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw strokes
      strokesRef.current.forEach((stroke, index) => {
        stroke.progress += stroke.speed
        drawBrushStroke(ctx, stroke)

        // Reset stroke when complete and slightly off screen
        if (stroke.progress > 1.1) {
          strokesRef.current[index] = createStroke()
        }
      })

      // Add new strokes occasionally for layered effect
      if (Math.random() > 0.995 && strokesRef.current.length < 6) {
        strokesRef.current.push(createStroke())
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  )
}
