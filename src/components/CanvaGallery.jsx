import { useEffect, useMemo, useRef, useState } from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const SWIPE_THRESHOLD = 48

export default function CanvaGallery({ items }) {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const touchStartX = useRef(null)
  const modalTouchStartX = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)

  useRevealOnScroll(sectionRef, [items.length])

  const activeItem = useMemo(() => {
    if (activeIndex === null) return null
    return items?.[activeIndex] ?? null
  }, [activeIndex, items])

  useEffect(() => {
    if (!activeItem) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? current : (current + 1) % items.length))
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current === null ? current : (current - 1 + items.length) % items.length))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeItem, items.length])

  const scrollGallery = (direction) => {
    const node = scrollRef.current
    if (!node) return

    const maxScroll = Math.max(node.scrollWidth - node.clientWidth, 0)
    const amount = Math.max(node.clientWidth * 0.82, 320)
    const current = Math.round(node.scrollLeft)

    if (direction > 0 && current >= maxScroll - 8) {
      node.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    if (direction < 0 && current <= 8) {
      node.scrollTo({ left: maxScroll, behavior: 'smooth' })
      return
    }

    node.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const touchEndX = event.changedTouches[0]?.clientX ?? null
    if (touchEndX === null) return

    const deltaX = touchEndX - touchStartX.current
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      scrollGallery(deltaX > 0 ? -1 : 1)
    }

    touchStartX.current = null
  }

  const moveModal = (direction) => {
    setActiveIndex((current) => {
      if (current === null) return current
      return (current + direction + items.length) % items.length
    })
  }

  const handleModalTouchStart = (event) => {
    modalTouchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleModalTouchEnd = (event) => {
    if (modalTouchStartX.current === null) return

    const touchEndX = event.changedTouches[0]?.clientX ?? null
    if (touchEndX === null) return

    const deltaX = touchEndX - modalTouchStartX.current
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      moveModal(deltaX > 0 ? -1 : 1)
    }

    modalTouchStartX.current = null
  }

  return (
    <>
      <section className="portfolio-section portfolio-light" id="canva-work" ref={sectionRef}>
        <div className="container">
          <div className="portfolio-heading-row portfolio-heading-row-gallery" data-reveal>
            <div>
              <p className="section-label section-label-dark">Featured Section</p>
              <h2 className="portfolio-title">Canva Work</h2>
            </div>
            <div className="portfolio-heading-actions">
              <p className="portfolio-intro">
                A curated collection of Alexia’s Canva-based design work, including promotional graphics, branded assets, story templates,
                and polished visual content built for social and marketing use.
              </p>
              <div className="gallery-controls" aria-label="Canva gallery controls">
                <button type="button" className="gallery-control-button" onClick={() => scrollGallery(-1)} aria-label="Scroll gallery left">
                  <span aria-hidden="true">←</span>
                </button>
                <button type="button" className="gallery-control-button" onClick={() => scrollGallery(1)} aria-label="Scroll gallery right">
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="gallery-scroll" ref={scrollRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {items.map((item, index) => (
              <article key={item.title} className="gallery-card gallery-card-scroll" data-reveal style={{ '--reveal-delay': `${Math.min(index * 70, 280)}ms` }}>
                <button
                  type="button"
                  className="gallery-media gallery-media-button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open ${item.title} preview`}
                >
                  {item.image ? (
                    <img src={item.previewImage || item.image} alt={item.title} loading="lazy" decoding="async" />
                  ) : (
                    <div className="gallery-placeholder">
                      <span>{item.imageLabel}</span>
                    </div>
                  )}
                </button>
                <div className="gallery-card-body gallery-card-body-compact">
                  <div className="gallery-card-copy">
                    <p className="gallery-tag">{item.category}</p>
                    <h3>{item.title}</h3>
                  </div>
                  {!!item.links?.length && (
                    <div className="portfolio-link-list" aria-label={`${item.title} links`}>
                      {item.links.map((link) => (
                        <a key={link.href} className="portfolio-link" href={link.href} target="_blank" rel="noreferrer">
                          <span className="portfolio-link-label">{link.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeItem && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${activeItem.title} preview`}>
          <button type="button" className="gallery-modal-backdrop" aria-label="Close preview" onClick={() => setActiveIndex(null)} />
          <div className="gallery-modal-panel" onTouchStart={handleModalTouchStart} onTouchEnd={handleModalTouchEnd}>
            <button type="button" className="gallery-modal-nav gallery-modal-nav-left" onClick={() => moveModal(-1)} aria-label="Show previous project">
              ‹
            </button>
            <button type="button" className="gallery-modal-nav gallery-modal-nav-right" onClick={() => moveModal(1)} aria-label="Show next project">
              ›
            </button>
            <button type="button" className="gallery-modal-close" onClick={() => setActiveIndex(null)} aria-label="Close preview">
              ×
            </button>
            <div className="gallery-modal-media">
              {activeItem.image ? (
                <img src={activeItem.modalImage || activeItem.image} alt={activeItem.title} decoding="async" />
              ) : (
                <div className="gallery-placeholder gallery-placeholder-modal">
                  <span>{activeItem.imageLabel}</span>
                </div>
              )}
            </div>
            <div className="gallery-modal-copy">
              <p className="gallery-tag">{activeItem.category}</p>
              <h3>{activeItem.title}</h3>
              {!!activeItem.description && <p>{activeItem.description}</p>}
              {!!activeItem.links?.length && (
                <div className="portfolio-link-list" aria-label={`${activeItem.title} links`}>
                  {activeItem.links.map((link) => (
                    <a key={link.href} className="portfolio-link" href={link.href} target="_blank" rel="noreferrer">
                      <span className="portfolio-link-label">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
