import { useRef, useEffect, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ForkKnife, Hamburger, PlusCircle, BeerStein, Plant } from '@phosphor-icons/react'
import { categories } from '@/data/menu'
import CategorySelector from './CategorySelector'
import ProductCard from './ProductCard'

const iconMap: Record<string, typeof ForkKnife> = {
  ForkKnife,
  Hamburger,
  PlusCircle,
  Beer: BeerStein,
  Plant,
}

const NAVBAR_HEIGHT = 64
const SCROLL_SPY_TIMEOUT = 1000

export default function MenuSection() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const [activeCategory, setActiveCategory] = useState('')
  const selectorRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef(new Map<string, HTMLElement>())
  const isScrollingProgrammatically = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const stickyObserverRef = useRef<IntersectionObserver | null>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const isStickyRef = useRef(false)

  const getSelectorHeight = () => selectorRef.current?.offsetHeight || 60
  const getOffset = () => NAVBAR_HEIGHT + getSelectorHeight() + 16

  // Register section refs
  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el)
    } else {
      sectionRefs.current.delete(id)
    }
  }, [])

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const offset = getOffset()
    const topMargin = -(offset)
    const rootMargin = `${topMargin}px 0px -40% 0px`

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingProgrammatically.current) return
        if (!isStickyRef.current) {
          setActiveCategory('')
          return
        }

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-category')
            if (id) setActiveCategory(id)
          }
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    )

    // Observe all category sections
    const sections = sectionRefs.current
    sections.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Observe sticky state of selector
  useEffect(() => {
    const sentinel = stickyRef.current
    if (!sentinel) return

    stickyObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        isStickyRef.current = !entry.isIntersecting
        if (!isStickyRef.current) {
          setActiveCategory('')
        }
      },
      { threshold: 0, rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px` }
    )

    stickyObserverRef.current.observe(sentinel)
    return () => stickyObserverRef.current?.disconnect()
  }, [])

  // On mount: detect active category for page refresh persistence
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isScrollingProgrammatically.current) return
      const offset = getOffset()
      let found = ''
      categories.forEach(cat => {
        const el = sectionRefs.current.get(cat.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= offset + 50) {
            found = cat.id
          }
        }
      })
      if (found && isStickyRef.current) {
        setActiveCategory(found)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleCategorySelect = (id: string) => {
    const el = sectionRefs.current.get(id)
    if (!el) return

    isScrollingProgrammatically.current = true
    setActiveCategory(id)

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

    const offset = getOffset()
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingProgrammatically.current = false
    }, SCROLL_SPY_TIMEOUT)
  }

  return (
    <section id="carta" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">
          {t('menu.title')}
        </h2>

        {/* Sticky sentinel */}
        <div ref={stickyRef} className="h-0" />

        {/* Sticky category selector */}
        <div
          ref={selectorRef}
          className="sticky bg-brand/95 backdrop-blur-sm z-30 -mx-4 px-4 border-b border-black/5"
          style={{ top: `${NAVBAR_HEIGHT}px` }}
        >
          <CategorySelector
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </div>

        {/* Category sections - all in DOM, no lazy loading */}
        <div className="mt-8 space-y-12">
          {categories.map(cat => (
            <div
              key={cat.id}
              data-category={cat.id}
              ref={(el) => registerSection(cat.id, el)}
            >
              {(() => { const Icon = iconMap[cat.icon] || ForkKnife; return (
              <h3 className="text-2xl font-display font-semibold mb-4 flex items-center gap-2">
                <Icon size={24} weight="duotone" />
                {isEn ? cat.nameEn : cat.name}
              </h3>
              ) })()}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {cat.products.map(product => (
                  <ProductCard key={`${cat.id}-${product.id}`} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
