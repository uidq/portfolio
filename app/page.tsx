"use client"

import { useState, useRef } from "react"
import Hero from "@/components/ui/hero"

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleEnter = () => {
    setHasEntered(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.30
      audioRef.current.play().catch(err => console.log("Audio play failed:", err))
    }
  }

  return (
    <main className="relative">
      <audio ref={audioRef} loop>
        <source src="https://r2.fivemanage.com/ymIhalK0qgovsxPVnry4A/PureImagination(OrchestralArrangement).mp3" type="audio/mp3" />
      </audio>

      <div className="fixed inset-0 -z-10 overflow-hidden w-screen h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://r2.fivemanage.com/ymIhalK0qgovsxPVnry4A/-8936282574693623564.mov" type="video/mp4" />
        </video>
      </div>

      {!hasEntered && (
        <div 
          onClick={handleEnter}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black cursor-pointer"
        >
          <p className="text-white text-xl">click here...</p>
        </div>
      )}

      <Hero />
    </main>
  )
}
