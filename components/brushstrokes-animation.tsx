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
      const segments = Math.floor(Math.random() * 60) + 80
      
      // Simulate brush loading - starts thick, thins, reloads
      let pressure = 0.1 // Start light (brush touching down)
      let brushLoad = 1.0

      for (let i = 0; i < segments; i++) {
        const t = i / segments
        
        // Pressure curve: light start, builds up, thins as paint depletes, occasional reload
        if (t < 0.1) {
          // Initial touch - pressure building
          pressure = t * 8
        } else if (brushLoad > 0.2) {
          // Main stroke - full pressure with variation
          pressure = 0.7 + Math.sin(i * 0.3) * 0.25 + Math.random() * 0.1
          brushLoad -= 0.008
        } else if (Math.random() > 0.95) {
          // Reload brush
          brushLoad = 0.8 + Math.random() * 0.2
          pressure = 0.5
        } else {
          // Running out of paint - thinner, scratchy
          pressure = brushLoad * 2 + Math.random() * 0.2
        }
        
        // Taper at end
        if (t > 0.9) {
          pressure *= (1 - t) * 10
        }

        points.push({ x, y, pressure: Math.max(0.05, Math.min(1, pressure)) })
        
        // Organic flowing movement
        const wave = Math.sin(i * 0.08) * 40
        const drift = Math.sin(i * 0.02) * 20
        
        x += (12 + Math.random() * 8) * direction
        y += wave * 0.15 + drift * 0.1 + (Math.random() - 0.5) * 15
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

      // Draw stroke segments with varying width based on pressure
      for (let i = 1; i < pointsToDraw; i++) {
        const prev = stroke.points[i - 1]
        const curr = stroke.points[i]
        
        // Calculate width based on pressure
        const width = stroke.maxWidth * curr.pressure
        
        // Main stroke
        ctx.globalAlpha = stroke.opacity * (0.7 + curr.pressure * 0.3)
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = width
        
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        
        // Smooth curve to current point
        const midX = (prev.x + curr.x) / 2
        const midY = (prev.y + curr.y) / 2
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
        ctx.stroke()

        // Paint texture - bristle marks
        if (curr.pressure > 0.5 && Math.random() > 0.7) {
          ctx.globalAlpha = stroke.opacity * 0.3
          ctx.lineWidth = 1
          const bristleOffset = (Math.random() - 0.5) * width * 0.6
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y + bristleOffset)
          ctx.lineTo(curr.x, curr.y + bristleOffset)
          ctx.stroke()
        }

        // Highlight edge for wet paint look
        if (curr.pressure > 0.4) {
          ctx.globalAlpha = stroke.opacity * 0.25 * curr.pressure
          ctx.strokeStyle = "#fef9f0"
          ctx.lineWidth = width * 0.2
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y - width * 0.25)
          ctx.quadraticCurveTo(prev.x, prev.y - width * 0.25, midX, midY - width * 0.25)
          ctx.stroke()
        }
      }

      // Draw paint buildup at end of stroke
      if (pointsToDraw > 2) {
        const lastPoint = stroke.points[pointsToDraw - 1]
        const secondLast = stroke.points[pointsToDraw - 2]
        
        if (lastPoint.pressure > 0.3) {
          ctx.globalAlpha = stroke.opacity * 0.5
          ctx.fillStyle = stroke.color
          const poolSize = stroke.maxWidth * lastPoint.pressure * 0.4
          ctx.beginPath()
          ctx.ellipse(
            lastPoint.x, 
            lastPoint.y, 
            poolSize, 
            poolSize * 0.6, 
            Math.atan2(lastPoint.y - secondLast.y, lastPoint.x - secondLast.x),
            0, 
            Math.PI * 2
          )
          ctx.fill()
        }
      }

      ctx.restore()
    }

    function animate() {
      // Very subtle fade for natural blending
      ctx.fillStyle = "rgba(248, 243, 233, 0.006)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw strokes
      strokesRef.current.forEach((stroke, index) => {
        stroke.progress += stroke.speed
        drawBrushStroke(ctx, stroke)

        // Reset stroke when complete
        if (stroke.progress >= 1.05) {
          strokesRef.current[index] = createStroke()
        }
      })

      // Occasionally add new stroke
      if (Math.random() > 0.997 && strokesRef.current.length < 5) {
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
