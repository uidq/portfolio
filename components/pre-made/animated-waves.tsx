"use client"

import { useEffect, useRef, useState } from 'react'

export function AnimatedWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const [isAudioActive, setIsAudioActive] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initAudio = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const analyser = audioContext.createAnalyser()
        
        analyser.fftSize = 256
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        
        audioContextRef.current = audioContext
        analyserRef.current = analyser
        dataArrayRef.current = dataArray
      } catch (e) {
        console.log('Audio context not supported:', e)
      }
    }

    initAudio()

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    
    const layerOffsets = Array.from({ length: 3 }, () => Math.random() * Math.PI * 2)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      let bassLevel = 0
      let midLevel = 0
      let trebleLevel = 0
      
      if (analyserRef.current && dataArrayRef.current && isAudioActive) {
        //analyserRef.current.getByteFrequencyData(dataArrayRef.current)
        
        const bass = dataArrayRef.current.slice(0, 8).reduce((a, b) => a + b, 0) / 8
        const mid = dataArrayRef.current.slice(8, 24).reduce((a, b) => a + b, 0) / 16
        const treble = dataArrayRef.current.slice(24, 64).reduce((a, b) => a + b, 0) / 40
        
        bassLevel = bass / 255
        midLevel = mid / 255
        trebleLevel = treble / 255
      } else {
        bassLevel = (Math.sin(time * 0.3) + 1) * 0.1
        midLevel = (Math.sin(time * 0.4 + 1) + 1) * 0.08
        trebleLevel = (Math.sin(time * 0.5 + 2) + 1) * 0.06
      }
      
      for (let layer = 0; layer < 3; layer++) {
        let amplitude = 50 + layer * 30 + Math.sin(time * 0.1 + layerOffsets[layer]) * 10
        const frequency = 0.002 + layer * 0.001 + Math.sin(time * 0.05 + layerOffsets[layer]) * 0.0005
        const speed = 0.2 + layer * 0.15 + Math.sin(time * 0.08 + layerOffsets[layer]) * 0.05
        let opacity = 0.1 - layer * 0.02 + Math.sin(time * 0.12 + layerOffsets[layer]) * 0.02

        if (isAudioActive) {
          switch (layer) {
            case 0:
              amplitude += bassLevel * 150
              break
            case 1:
              amplitude += midLevel * 120
              break
            case 2:
              amplitude += trebleLevel * 90
              break
          }
        } else {
          switch (layer) {
            case 0:
              amplitude += bassLevel * 80
              break
            case 1:
              amplitude += midLevel * 60
              break
            case 2:
              amplitude += trebleLevel * 40
              break
          }
        }
        
        ctx.save()
        ctx.globalAlpha = Math.max(0.05, Math.min(0.2, opacity))
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, '#fcc2d7')
        gradient.addColorStop(0.5, '#fcc2d7')
        gradient.addColorStop(1, '#fcc2d7')
        
        ctx.fillStyle = gradient
        
        ctx.beginPath()
        
        ctx.moveTo(0, canvas.height / 2)
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const noiseX = x + Math.sin(time * 0.1 + x * 0.01) * 3
          
          const baseWave = Math.sin(noiseX * frequency + time * speed + layerOffsets[layer]) * amplitude
          const secondaryWave = Math.sin(noiseX * frequency * 0.7 + time * speed * 0.6 + layerOffsets[layer]) * amplitude * 0.5
          const tertiaryWave = Math.sin(noiseX * frequency * 1.3 + time * speed * 0.8 + layerOffsets[layer]) * amplitude * 0.15
          
          const y = canvas.height / 2 + baseWave + secondaryWave + tertiaryWave
          ctx.lineTo(x, y)
        }
        
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()
        
        ctx.strokeStyle = '#fcc2d7'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()
      }

      time += 0.008
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [isAudioActive])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}