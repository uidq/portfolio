"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ASCIIText from '@/components/pre-made/ASCIIText';
import DecryptedText from '@/components/pre-made/decrypted-text';
import Terminal from "@/components/ui/terminal"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showASCII, setShowASCII] = useState(Math.random() < 0.5)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const explosionParticles: ExplosionParticle[] = []
    const particleCount = 100
    const mouse = { x: -1000, y: -1000, radius: 100 }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius + this.size) {
          const angle = Math.atan2(dy, dx)
          const targetX = mouse.x + Math.cos(angle) * (mouse.radius + this.size)
          const targetY = mouse.y + Math.sin(angle) * (mouse.radius + this.size)
          
          createExplosion(this.x, this.y)
          
          this.x = targetX
          this.y = targetY

          const bounceSpeed = 2
          this.speedX = Math.cos(angle) * bounceSpeed
          this.speedY = Math.sin(angle) * bounceSpeed
        }

        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
          this.x = Math.max(0, Math.min(canvas.width, this.x))
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
          this.y = Math.max(0, Math.min(canvas.height, this.y))
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 222, 235, 1.0)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class ExplosionParticle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      alpha: number
      decay: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 2 + 1
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4 + 2
        this.speedX = Math.cos(angle) * speed
        this.speedY = Math.sin(angle) * speed
        this.alpha = 1
        this.decay = Math.random() * 0.02 + 0.015
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.alpha -= this.decay
        this.speedX *= 0.98
        this.speedY *= 0.98
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = "rgba(255, 222, 235, 1.0)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      isDead() {
        return this.alpha <= 0
      }
    }

    function createExplosion(x: number, y: number) {
      const particleCount = 8
      for (let i = 0; i < particleCount; i++) {
        explosionParticles.push(new ExplosionParticle(x, y))
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      for (let i = explosionParticles.length - 1; i >= 0; i--) {
        const particle = explosionParticles[i]
        particle.update()
        particle.draw()
        
        if (particle.isDead()) {
          explosionParticles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center pointer-events-none">
        <motion.div
          className="relative w-full max-w-4xl -mb-4"
          style={{ height: '250px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ASCIIText 
            text="uid" 
            asciiFontSize={6}
            textFontSize={250}
            textColor="#ffdeeb"
            planeBaseHeight={12}
            enableWaves={true}
          />
        </motion.div>
        <motion.p
          className="max-w-[600px] text-lg text-white sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DecryptedText
            text="Software Developer"
            speed={250}
            maxIterations={30}
            revealDirection="start"
            animateOn="view"
            sequential={true}
            useOriginalCharsOnly={true}
            parentClassName="all-letters"
            encryptedClassName="encrypted"
          />
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 w-full px-4 sm:px-0 flex justify-center"
        >
          <Terminal variant="inline" />
        </motion.div>
      </div>
    </div>
  )
}