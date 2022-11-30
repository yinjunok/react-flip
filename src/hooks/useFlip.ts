import { useRef, useLayoutEffect } from 'react'

const rectCache = new Map<string, DOMRect>()

type MeasureResult = {
  x: number
  y: number
  scaleX: number
  scaleY: number
} | undefined

const measure = (preRect: DOMRect, curRect: DOMRect): MeasureResult => {
  if (
    preRect.left !== curRect.left ||
    preRect.top !== curRect.top ||
    preRect.width !== curRect.width ||
    preRect.height !== curRect.height
  ) {
    return {
      x: curRect.left - preRect.left,
      y: curRect.top - preRect.top,
      scaleX: curRect.width / preRect.width,
      scaleY: curRect.height / preRect.height,
    }
  }

  return undefined
}

const useFlip = <T extends HTMLElement = HTMLElement>(layoutId?: string) => {
  const domRef = useRef<T | null>(null)
  const preRect = useRef<DOMRect | undefined>()

  useLayoutEffect(() => {
    if (domRef.current) {
      const rect = domRef.current.getBoundingClientRect()
      if (preRect.current) {
        const r = measure(preRect.current, rect)
        if (r) {
          domRef.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) scale(${r.scaleX}, ${r.scaleY})`
          domRef.current.style.transition = 'none'

          requestAnimationFrame(() => {
            if (domRef.current) {
              domRef.current.style.transition = 'transform .5s ease-in-out'
              domRef.current.style.transform = 'none'
              domRef.current.style.transformOrigin = '0 0 0'
            }
          })
        }
      }
      preRect.current = rect
    }
  })

  useLayoutEffect(() => {
    if (layoutId && domRef.current) {
      const prev = rectCache.get(layoutId)
      if (prev) {
        const r = measure(prev, domRef.current.getBoundingClientRect())
        if (r) {
          domRef.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) scale(${r.scaleX}, ${r.scaleY})`
          domRef.current.style.transition = 'none'
  
          requestAnimationFrame(() => {
            if (domRef.current) {
              domRef.current.style.transition = 'transform .5s ease-in-out'
              domRef.current.style.transform = 'none'
              domRef.current.style.transformOrigin = '0 0 0'
            }
          })
        }
      }
    }

    return () => {
      if (layoutId && domRef.current) {
        rectCache.set(layoutId, domRef.current.getBoundingClientRect())
      }
    }
  }, [])

  return domRef
}

export default useFlip
