import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown } from '@phosphor-icons/react'

export default function ScrollButtons() {
  const [showUp, setShowUp] = useState(false)
  const [showDown, setShowDown] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      setShowUp(scrollY > 300)
      setShowDown(scrollY + winHeight < docHeight - 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })

  if (!showUp && !showDown) return null

  return (
    <div className="fixed bottom-28 right-4 z-40 flex flex-col gap-2">
      {showUp && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/80 hover:text-white backdrop-blur-sm transition-colors shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} weight="bold" />
        </button>
      )}
      {showDown && (
        <button
          onClick={scrollToBottom}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black/80 hover:text-white backdrop-blur-sm transition-colors shadow-lg"
          aria-label="Scroll to bottom"
        >
          <ArrowDown size={18} weight="bold" />
        </button>
      )}
    </div>
  )
}
