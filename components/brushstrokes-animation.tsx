"use client"

import { useEffect, useRef } from "react"

interface Brushstroke {
  x: number
  y: number
  length: number
  angle: number
  width: number
  opacity: number
  color: string
  animationPhase: number
  animationSpeed: number
}

export function BrushstrokesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const strokesRef = useRef<Brushstroke[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize brushstrokes with staggered positions
    const strokeCount = 12
    strokesRef.current = Array.from({ length: strokeCount }, (_, i) => createBrushstroke(i))

    function createBrushstroke(index: number): Brushstroke {
      return {
        x: Math.random() * canvas.width,
        y: (index / strokeCount) * canvas.height + Math.random() * 100 - 50,
        length: Math.random() * 200 + 150,
        angle: Math.random() * Math.PI * 2,
        width: Math.random() * 8 + 4,
        opacity: Math.random() * 0.15 + 0.05,
        color: Math.random() > 0.5 ? "#c97954" : "#d4af37",
        animationPhase: Math.random() * Math.PI * 2,
        animationSpeed: Math.random() * 0.008 + 0.003,
      }
    }

    function drawBrushstroke(ctx: CanvasRenderingContext2D, stroke: Brushstroke) {
      // Animate opacity with sine wave for breathing effect
      const breathe = Math.sin(stroke.animationPhase) * 0.3 + 0.7
      const currentOpacity = stroke.opacity * breathe

      ctx.save()
      ctx.globalAlpha = currentOpacity
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Add slight wobble to angle based on animation phase
      const wobbleAngle = stroke.angle + Math.sin(stroke.animationPhase * 0.5) * 0.05

      ctx.beginPath()
      ctx.moveTo(stroke.x, stroke.y)
      ctx.lineTo(
        stroke.x + Math.cos(wobbleAngle) * stroke.length,
        stroke.y + Math.sin(wobbleAngle) * stroke.length
      )
      ctx.stroke()

      // Add subtle texture with dashed secondary stroke
      if (breathe > 0.8) {
        ctx.globalAlpha = currentOpacity * 0.3
        ctx.lineWidth = stroke.width * 0.5
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(stroke.x, stroke.y)
        ctx.lineTo(
          stroke.x + Math.cos(wobbleAngle) * stroke.length * 0.7,
          stroke.y + Math.sin(wobbleAngle) * stroke.length * 0.7
        )
        ctx.stroke()
        ctx.setLineDash([])
      }

      ctx.restore()
    }

    function animate() {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(248, 243, 233, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw brushstrokes
      strokesRef.current.forEach((stroke) => {
        stroke.animationPhase += stroke.animationSpeed
        drawBrushstroke(ctx, stroke)

        // Wrap animation phase
        if (stroke.animationPhase > Math.PI * 2) {
          stroke.animationPhase -= Math.PI * 2
        }
      })

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
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
