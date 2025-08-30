"use client"

import { Suspense, lazy, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface LazyLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function LazyLoader({
  children,
  fallback = <div className="animate-pulse bg-zinc-800 rounded-lg h-48" />,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true
}: LazyLoaderProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce
  })

  return (
    <div ref={ref}>
      {inView ? children : fallback}
    </div>
  )
}

export function createLazyComponent<T extends object = object>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn)
  
  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={fallback || <div className="animate-pulse bg-zinc-800 rounded-lg h-48" />}>
        <LazyComponent {...props as any} />
      </Suspense>
    )
  }
}