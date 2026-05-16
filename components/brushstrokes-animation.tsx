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
  flowOffset: number
  flowSpeed: number
  waveAmplitude: number
  waveFrequency: number
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

    // Initialize brushstrokes with continuous flow paths
    const strokeCount = 16
    strokesRef.current = Array.from({ length: strokeCount }, (_, i) => createBrushstroke(i, strokeCount))

    function createBrushstroke(index: number, total: number): Brushstroke {
      const startY = (index / total) * canvas.height
      return {
        x: -300,
        y: startY + Math.sin(index * 0.5) * 100,
        length: Math.random() * 180 + 200,
        angle: Math.random() * 0.3 - 0.15,
        width: Math.random() * 10 + 6,
        opacity: Math.random() * 0.2 + 0.08,
        color: Math.random() > 0.5 ? "#c97954" : "#d4af37",
        flowOffset: 0,
        flowSpeed: Math.random() * 1.5 + 0.8,
        waveAmplitude: Math.random() * 60 + 40,
        waveFrequency: Math.random() * 0.008 + 0.004,
      }
    }

    function drawBrushstroke(ctx: CanvasRenderingContext2D, stroke: Brushstroke, time: number) {
      ctx.save()
      ctx.globalAlpha = stroke.opacity
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Calculate wave motion for vertical oscillation
      const waveY = Math.sin(time * stroke.waveFrequency) * stroke.waveAmplitude

      ctx.beginPath()
      ctx.moveTo(stroke.x, stroke.y + waveY)
      ctx.lineTo(
        stroke.x + Math.cos(stroke.angle) * stroke.length,
        stroke.y + waveY + Math.sin(stroke.angle) * stroke.length
      )
      ctx.stroke()

      // Add highlight stroke for shimmer
      ctx.globalAlpha = stroke.opacity * 0.4
      ctx.lineWidth = stroke.width * 0.4
      ctx.strokeStyle = "#fef5e7"
      ctx.beginPath()
      ctx.moveTo(stroke.x + 1, stroke.y + 1 + waveY)
      ctx.lineTo(
        stroke.x + 1 + Math.cos(stroke.angle) * stroke.length * 0.8,
        stroke.y + 1 + waveY + Math.sin(stroke.angle) * stroke.length * 0.8
      )
      ctx.stroke()

      ctx.restore()
    }

    function animate(time: number) {
      // Clear canvas with very subtle fade
      ctx.fillStyle = "rgba(248, 243, 233, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw brushstrokes
      strokesRef.current.forEach((stroke) => {
        // Continuous horizontal flow
        stroke.flowOffset += stroke.flowSpeed
        stroke.x = (stroke.flowOffset % (canvas.width + 600)) - 300

        drawBrushstroke(ctx, stroke, time)

        // Reset when stroke flows off screen
        if (stroke.x > canvas.width + 100) {
          stroke.flowOffset = -300
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    let startTime = Date.now()
    const animationLoop = () => {
      const elapsed = Date.now() - startTime
      animate(elapsed)
    }

    animationLoop()

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
