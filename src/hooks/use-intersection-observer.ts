'use client'

import { RefObject, useEffect, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: UseIntersectionObserverProps = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  useEffect(() => {
    const element = elementRef?.current
    if (!element) {return}

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      threshold: options.threshold || 0,
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options.threshold, options.root, options.rootMargin])

  return isIntersecting
}