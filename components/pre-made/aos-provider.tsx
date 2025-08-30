"use client"

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface AOSProviderProps {
  children: React.ReactNode
}

export function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 100,
      anchorPlacement: 'top-bottom'
    })

    return () => {
      AOS.refresh()
    }
  }, [])

  return <>{children}</>
}