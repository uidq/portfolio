"use client"

import { useEffect, useRef, useState } from 'react'

interface IntersectionObserverProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  onIntersect?: (entry: IntersectionObserverEntry) => void
  className?: string
  animationClass?: string
  delay?: number
}

export function IntersectionObserver({
  children,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  onIntersect,
  className = '',
  animationClass = 'animate-fade-in',
  delay = 0
}: IntersectionObserverProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new (window as any).IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true)
                setHasAnimated(true)
                onIntersect?.(entry)
              }, delay)
            } else {
              setIsVisible(true)
              setHasAnimated(true)
              onIntersect?.(entry)
            }

            if (triggerOnce) {
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin
      } as IntersectionObserverInit
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, onIntersect, delay])

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'} transition-all duration-1000`}
    >
      {children}
    </div>
  )
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new (window as any).IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin
      } as IntersectionObserverInit
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref: elementRef, isVisible }
}