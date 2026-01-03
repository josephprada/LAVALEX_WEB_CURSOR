import { useState, useEffect } from 'react'

interface UseScrollReturn {
  scrollY: number
  scrollDirection: 'up' | 'down' | null
  isScrolled: boolean
}

export const useScroll = (): UseScrollReturn => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScroll = () => {
      const currentScrollY = window.scrollY

      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { scrollY, scrollDirection, isScrolled }
}

