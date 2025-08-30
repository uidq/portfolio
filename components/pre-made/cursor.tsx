"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  velocity: number
  type: number
}

export function EnhancedFallingStars() {
  const [stars, setStars] = useState<Star[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (Math.random() > 0.7) {
        const newStar: Star = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() * 20 - 10),
          y: e.clientY + (Math.random() * 20 - 10),
          size: Math.random() * 6 + 2,
          opacity: 0.8 + Math.random() * 0.2,
          rotation: Math.random() * 360,
          velocity: Math.random() * 1.5 + 0.5,
          type: Math.floor(Math.random() * 3),
        }

        setStars((prevStars) => [...prevStars, newStar])
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (stars.length === 0) return

    const animationFrame = requestAnimationFrame(() => {
      setStars(
        (prevStars) =>
          prevStars
            .map((star) => ({
              ...star,
              y: star.y + star.velocity,
              opacity: star.opacity - 0.008,
              rotation: star.rotation + 0.5,
            }))
            .filter((star) => star.opacity > 0),
      )
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [stars])

  const starPaths = [
    "M12 2L14.5 9.5H22L16 14.5L18 22L12 17.5L6 22L8 14.5L2 9.5H9.5L12 2Z",
    "M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8L12 0Z",
    "M12 5L13 10L18 12L13 14L12 19L11 14L6 12L11 10L12 5Z",
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: star.x,
            top: star.y,
            opacity: star.opacity,
            transform: `rotate(${star.rotation}deg)`,
            transition: "opacity 0.8s ease-out",
          }}
        >
          <svg width={star.size} height={star.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={starPaths[star.type]} fill="white" />
          </svg>
        </div>
      ))}
    </div>
  )
}

