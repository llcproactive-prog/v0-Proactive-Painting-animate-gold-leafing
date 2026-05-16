"use client"

import { useEffect, useRef } from "react"

interface PaintWash {
  x: number
  y: number
  vx: number
  vy: number
  width: number
  height: number
  opacity: number
  color: string
  flowScale: number
  time: number
  duration: number
}

interface PaintDrip {
  x: number
  y: number
  vy: number
  width: number
  opacity: number
  color: string
  dripped: number
  poolSize: number
  startTime: number
}

export function BrushstrokesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const washesRef = useRef<PaintWash[]>([])
  const dripsRef = useRef<PaintDrip[]>([])
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

    // Brand colors
    const colors = ["#c97954", "#d4af37", "#6e7d5e", "#e8b4a8"]

    // Initialize layered watercolor washes
    washesRef.current = Array.from({ length: 12 }, (_, i) =>
      createWash(i)
    )

    function createWash(index: number): PaintWash {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        width: Math.random() * 300 + 200,
        height: Math.random() * 200 + 150,
        opacity: Math.random() * 0.08 + 0.02,
        color: colors[index % colors.length],
        flowScale: Math.random() * 0.5 + 0.5,
        time: Math.random() * Math.PI * 2,
        duration: Math.random() * 8000 + 10000,
      }
    }

    function createDrip(x: number, y: number, color: string): PaintDrip {
      return {
        x: x + (Math.random() - 0.5) * 50,
        y: y,
        vy: Math.random() * 0.8 + 0.3,
        width: Math.random() * 20 + 12,
        opacity: Math.random() * 0.15 + 0.08,
        color: color,
        dripped: 0,
        poolSize: Math.random() * 60 + 40,
        startTime: Date.now(),
      }
    }

    function drawWash(ctx: CanvasRenderingContext2D, wash: PaintWash, time: number) {
      const progress = (time % wash.duration) / wash.duration
      const wobble = Math.sin(time * 0.0003) * 30

      ctx.save()
      ctx.globalAlpha = wash.opacity * (0.5 + Math.sin(progress * Math.PI * 2) * 0.3)
      ctx.fillStyle = wash.color

      // Create organic wash shape with multiple bezier curves
      ctx.beginPath()
      ctx.ellipse(
        wash.x + wobble,
        wash.y,
        wash.width * wash.flowScale,
        wash.height,
        progress * Math.PI * 0.5,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // Add secondary wash layer for depth
      ctx.globalAlpha = (wash.opacity * 0.4) * (0.5 + Math.sin((progress + 0.5) * Math.PI * 2) * 0.3)
      ctx.beginPath()
      ctx.ellipse(
        wash.x + wobble * 0.7,
        wash.y + 50,
        wash.width * wash.flowScale * 0.7,
        wash.height * 0.6,
        progress * Math.PI * 0.3,
        0,
        Math.PI * 2
      )
      ctx.fill()

      ctx.restore()
    }

    function drawDrip(ctx: CanvasRenderingContext2D, drip: PaintDrip) {
      ctx.save()
      ctx.globalAlpha = drip.opacity
      ctx.fillStyle = drip.color
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Main drip body
      ctx.beginPath()
      ctx.ellipse(drip.x, drip.y, drip.width * 0.5, drip.dripped, 0.2, 0, Math.PI * 2)
      ctx.fill()

      // Pool at bottom
      ctx.globalAlpha = drip.opacity * 0.5
      ctx.beginPath()
      ctx.ellipse(drip.x, drip.y + drip.dripped, drip.poolSize * 0.3, drip.poolSize * 0.15, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    function animate(time: number) {
      // Subtle fade for trail effect
      ctx.fillStyle = "rgba(248, 243, 233, 0.003)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update watercolor washes
      washesRef.current.forEach((wash) => {
        // Slow drifting motion
        wash.x += wash.vx
        wash.y += wash.vy
        wash.time += 0.5

        // Wrap around edges
        if (wash.x > canvas.width + wash.width) wash.x = -wash.width
        if (wash.x < -wash.width) wash.x = canvas.width + wash.width
        if (wash.y > canvas.height + wash.height) wash.y = -wash.height
        if (wash.y < -wash.height) wash.y = canvas.height + wash.height

        drawWash(ctx, wash, wash.time)
      })

      // Occasionally spawn new drips
      if (Math.random() > 0.98) {
        const wash = washesRef.current[Math.floor(Math.random() * washesRef.current.length)]
        dripsRef.current.push(
          createDrip(
            wash.x + (Math.random() - 0.5) * wash.width,
            wash.y,
            wash.color
          )
        )
      }

      // Draw and update drips
      dripsRef.current = dripsRef.current.filter((drip) => {
        const elapsed = Date.now() - drip.startTime
        if (elapsed < 2000) {
          drip.dripped += drip.vy
          drip.y += drip.vy * 0.5
          drawDrip(ctx, drip)
          return true
        }
        return false
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
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  )
}
