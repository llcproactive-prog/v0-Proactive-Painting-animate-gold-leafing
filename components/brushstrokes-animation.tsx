"use client"

import { useEffect, useRef } from "react"

interface ScribblePath {
  points: { x: number; y: number }[]
  color: string
  lineWidth: number
  opacity: number
  progress: number
  speed: number
  startX: number
  startY: number
}

export function BrushstrokesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scribbleRef = useRef<ScribblePath[]>([])
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

    function generateScribblePath(startX: number, startY: number): { x: number; y: number }[] {
      const points: { x: number; y: number }[] = []
      let x = startX
      let y = startY
      const segments = Math.floor(Math.random() * 30) + 40
      const direction = Math.random() > 0.5 ? 1 : -1

      for (let i = 0; i < segments; i++) {
        points.push({ x, y })
        
        // Zigzag pattern moving horizontally with vertical oscillation
        x += (Math.random() * 30 + 20) * direction
        
        // Alternating up/down for zigzag effect
        const zigzag = (i % 2 === 0) ? -1 : 1
        y += zigzag * (Math.random() * 60 + 40)
        
        // Add some curve variation
        if (Math.random() > 0.7) {
          y += (Math.random() - 0.5) * 30
        }
      }

      return points
    }

    function createScribble(): ScribblePath {
      const startX = Math.random() > 0.5 ? -100 : canvas.width + 100
      const startY = Math.random() * canvas.height * 0.8 + canvas.height * 0.1

      return {
        points: generateScribblePath(startX, startY),
        color: colors[Math.floor(Math.random() * colors.length)],
        lineWidth: Math.random() * 8 + 4,
        opacity: Math.random() * 0.15 + 0.05,
        progress: 0,
        speed: Math.random() * 0.008 + 0.004,
        startX,
        startY,
      }
    }

    // Initialize with a few scribbles
    scribbleRef.current = Array.from({ length: 4 }, () => createScribble())

    function drawScribble(ctx: CanvasRenderingContext2D, scribble: ScribblePath) {
      if (scribble.points.length < 2) return

      const pointsToDraw = Math.floor(scribble.points.length * scribble.progress)
      if (pointsToDraw < 2) return

      ctx.save()
      ctx.globalAlpha = scribble.opacity
      ctx.strokeStyle = scribble.color
      ctx.lineWidth = scribble.lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw the main scribble path
      ctx.beginPath()
      ctx.moveTo(scribble.points[0].x, scribble.points[0].y)

      for (let i = 1; i < pointsToDraw; i++) {
        const prev = scribble.points[i - 1]
        const curr = scribble.points[i]
        
        // Use quadratic curves for smoother lines
        const midX = (prev.x + curr.x) / 2
        const midY = (prev.y + curr.y) / 2
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY)
      }
      ctx.stroke()

      // Add highlight stroke for paint texture
      ctx.globalAlpha = scribble.opacity * 0.4
      ctx.lineWidth = scribble.lineWidth * 0.3
      ctx.strokeStyle = "#fef5e7"
      ctx.beginPath()
      ctx.moveTo(scribble.points[0].x + 2, scribble.points[0].y + 2)

      for (let i = 1; i < pointsToDraw; i++) {
        const prev = scribble.points[i - 1]
        const curr = scribble.points[i]
        const midX = (prev.x + curr.x) / 2
        const midY = (prev.y + curr.y) / 2
        ctx.quadraticCurveTo(prev.x + 2, prev.y + 2, midX + 2, midY + 2)
      }
      ctx.stroke()

      ctx.restore()
    }

    function animate() {
      // Very subtle fade for trail persistence
      ctx.fillStyle = "rgba(248, 243, 233, 0.008)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw scribbles
      scribbleRef.current.forEach((scribble, index) => {
        scribble.progress += scribble.speed

        drawScribble(ctx, scribble)

        // Reset scribble when complete
        if (scribble.progress >= 1) {
          scribbleRef.current[index] = createScribble()
        }
      })

      // Occasionally add new scribble
      if (Math.random() > 0.995 && scribbleRef.current.length < 8) {
        scribbleRef.current.push(createScribble())
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
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  )
}
