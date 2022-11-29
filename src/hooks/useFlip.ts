import { useRef, useLayoutEffect } from 'react'

const rectCache = new Map<string, DOMRect>()

const useFlip = <T extends HTMLElement = HTMLElement>(layoutId?: string) => {
  const domRef = useRef<T | null>(null)
  const preRect = useRef<DOMRect | undefined>()

  useLayoutEffect(() => {
    if (domRef.current) {
      const rect = domRef.current.getBoundingClientRect()
      if (preRect.current) {
        if (
          rect.left !== preRect.current.left ||
          rect.top !== preRect.current.top ||
          rect.width !== preRect.current.width ||
          rect.height !== preRect.current.height
        ) {
          const disLeft = preRect.current.left - rect.left
          const disTop = preRect.current.top - rect.top
          const scaleX = preRect.current.width / rect.width
          const scaleY = preRect.current.height / rect.height
          domRef.current.style.transform = `translate3d(${disLeft}px, ${disTop}px, 0) scale(${scaleX}, ${scaleY})`
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
        const rect = domRef.current.getBoundingClientRect()
        const disLeft = prev.left - rect.left
        const disTop = prev.top - rect.top
        const scaleX = prev.width / rect.width
        const scaleY = prev.height / rect.height
        domRef.current.style.transform = `translate3d(${disLeft}px, ${disTop}px, 0) scale(${scaleX}, ${scaleY})`
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

    return () => {
      if (layoutId && domRef.current) {
        rectCache.set(layoutId, domRef.current.getBoundingClientRect())
      }
    }
  }, [])

  return domRef
}

export default useFlip
