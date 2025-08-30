"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GSAPWrapperProps {
  children: React.ReactNode
  animation?: string
  trigger?: string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  className?: string
}

export function GSAPWrapper({
  children,
  animation = 'fadeIn',
  trigger,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  pin = false,
  className = ''
}: GSAPWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const triggerElement = trigger ? document.querySelector(trigger) : element

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub,
        pin,
        toggleActions: "play none none none"
      }
    })

    switch (animation) {
      case 'fadeIn':
        gsap.set(element, { opacity: 0, y: 50 })
        timeline.to(element, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        break
      
      case 'slideUp':
        gsap.set(element, { y: 100, opacity: 0 })
        timeline.to(element, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
        break
      
      case 'slideLeft':
        gsap.set(element, { x: 100, opacity: 0 })
        timeline.to(element, { x: 0, opacity: 1, duration: 1, ease: "power2.out" })
        break
      
      case 'slideRight':
        gsap.set(element, { x: -100, opacity: 0 })
        timeline.to(element, { x: 0, opacity: 1, duration: 1, ease: "power2.out" })
        break
      
      case 'scale':
        gsap.set(element, { scale: 0.8, opacity: 0 })
        timeline.to(element, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" })
        break
      
      case 'rotate':
        gsap.set(element, { rotation: -10, opacity: 0 })
        timeline.to(element, { rotation: 0, opacity: 1, duration: 1, ease: "power2.out" })
        break
      
      case 'parallax':
        timeline.to(element, { y: -50, duration: 1, ease: "none" })
        break
      
      case 'typewriter':
        const text = element.textContent || ''
        element.textContent = ''
        timeline.to({}, {
          duration: text.length * 0.05,
          onUpdate: function() {
            const progress = Math.round(this.progress() * text.length)
            element.textContent = text.slice(0, progress)
          }
        })
        break
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === triggerElement) {
          trigger.kill()
        }
      })
    }
  }, [animation, trigger, start, end, scrub, pin])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}