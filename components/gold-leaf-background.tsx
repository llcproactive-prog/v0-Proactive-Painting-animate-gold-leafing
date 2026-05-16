"use client"

import { useEffect, useRef } from "react"

interface GoldLeaf {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speedX: number
  speedY: number
  opacity: number
  shimmerPhase: number
  shimmerSpeed: number
  shape: number
}

export function GoldLeafBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const leavesRef = useRef<GoldLeaf[]>([])
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

    // Initialize gold leaves
    const leafCount = Math.floor((window.innerWidth * window.innerHeight) / 25000)
    leavesRef.current = Array.from({ length: Math.max(15, leafCount) }, () => createLeaf(canvas))

    function createLeaf(canvas: HTMLCanvasElement): GoldLeaf {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.4 + 0.2,
        shimmerPhase: Math.random() * Math.PI * 2,
        shimmerSpeed: Math.random() * 0.02 + 0.01,
        shape: Math.floor(Math.random() * 3),
      }
    }

    function drawLeaf(ctx: CanvasRenderingContext2D, leaf: GoldLeaf) {
      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.rotation)

      // Shimmer effect
      const shimmer = Math.sin(leaf.shimmerPhase) * 0.3 + 0.7
      const alpha = leaf.opacity * shimmer

      // Create gradient for gold effect
      const gradient = ctx.createLinearGradient(-leaf.size / 2, -leaf.size / 2, leaf.size / 2, leaf.size / 2)
      gradient.addColorStop(0, `rgba(244, 228, 166, ${alpha})`)
      gradient.addColorStop(0.3, `rgba(212, 175, 55, ${alpha})`)
      gradient.addColorStop(0.6, `rgba(255, 215, 0, ${alpha * 1.2})`)
      gradient.addColorStop(1, `rgba(184, 134, 11, ${alpha})`)

      ctx.fillStyle = gradient

      // Draw different leaf shapes
      ctx.beginPath()
      if (leaf.shape === 0) {
        // Irregular polygon (gold flake)
        const points = 6
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2
          const radius = leaf.size * (0.5 + Math.random() * 0.3)
          const px = Math.cos(angle) * radius
          const py = Math.sin(angle) * radius
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
      } else if (leaf.shape === 1) {
        // Diamond shape
        ctx.moveTo(0, -leaf.size / 2)
        ctx.lineTo(leaf.size / 3, 0)
        ctx.lineTo(0, leaf.size / 2)
        ctx.lineTo(-leaf.size / 3, 0)
      } else {
        // Curved leaf shape
        ctx.moveTo(0, -leaf.size / 2)
        ctx.quadraticCurveTo(leaf.size / 2, 0, 0, leaf.size / 2)
        ctx.quadraticCurveTo(-leaf.size / 2, 0, 0, -leaf.size / 2)
      }
      ctx.closePath()
      ctx.fill()

      // Add highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`
      ctx.beginPath()
      ctx.ellipse(-leaf.size / 6, -leaf.size / 6, leaf.size / 8, leaf.size / 12, Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      leavesRef.current.forEach((leaf) => {
        // Update position
        leaf.x += leaf.speedX
        leaf.y += leaf.speedY
        leaf.rotation += leaf.rotationSpeed
        leaf.shimmerPhase += leaf.shimmerSpeed

        // Wrap around screen
        if (leaf.y > canvas.height + leaf.size) {
          leaf.y = -leaf.size
          leaf.x = Math.random() * canvas.width
        }
        if (leaf.x > canvas.width + leaf.size) leaf.x = -leaf.size
        if (leaf.x < -leaf.size) leaf.x = canvas.width + leaf.size

        drawLeaf(ctx, leaf)
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
