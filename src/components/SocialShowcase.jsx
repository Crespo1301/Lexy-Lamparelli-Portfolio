import { useEffect, useMemo, useRef, useState } from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function SocialShowcase({ items }) {
  const sectionRef = useRef(null)
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
    if (Math.abs(deltaX) >= 48) {
      moveModal(deltaX > 0 ? -1 : 1)
    }

    modalTouchStartX.current = null
  }

  return (
    <>
      <section className="portfolio-section portfolio-dark" id="social-media" ref={sectionRef}>
        <div className="container">
          <div className="portfolio-heading-row portfolio-heading-row-dark" data-reveal>
            <div>
              <p className="section-label">Content Showcase</p>
              <h2 className="portfolio-title portfolio-title-light">Social Media Work</h2>
            </div>
            <p className="portfolio-intro portfolio-intro-light">
              A snapshot of Alexia’s short-form content work across TikTok and Instagram, centered around lifestyle, fashion, fitness,
              skincare, and hair care storytelling.
            </p>
          </div>

          <div className="social-grid">
            {items.map((item, index) => (
              <article key={item.title} className="social-card" data-reveal style={{ '--reveal-delay': `${Math.min(index * 70, 210)}ms` }}>
                <button
                  type="button"
                  className="social-card-media social-card-media-button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open ${item.title} preview`}
                >
                  {item.thumbnail ? (
                    <img className="social-preview-image" src={item.thumbnail} alt={item.title} loading="lazy" decoding="async" />
                  ) : (
                    <div className="social-placeholder">
                      <span>{item.platform}</span>
                      <strong>Featured content</strong>
                    </div>
                  )}
                </button>

                <div className="social-card-body social-card-body-compact">
                  <div className="social-card-copy">
                    <div className="social-meta-row">
                      <p>{item.platform}</p>
                      <span>{item.metric}</span>
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="social-card-actions">
                    {!!item.links?.length && (
                      <div className="portfolio-link-list portfolio-link-list-dark" aria-label={`${item.title} links`}>
                        {item.links.map((link) => (
                          <a key={link.href} className="portfolio-link portfolio-link-dark" href={link.href} target="_blank" rel="noreferrer">
                            <span className="portfolio-link-label">{link.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                    <a href={item.link} target="_blank" rel="noreferrer">
                      View profile ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeItem && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${activeItem.title} preview`}>
          <button type="button" className="gallery-modal-backdrop" aria-label="Close preview" onClick={() => setActiveIndex(null)} />
          <div className="gallery-modal-panel gallery-modal-panel-dark" onTouchStart={handleModalTouchStart} onTouchEnd={handleModalTouchEnd}>
            <button
              type="button"
              className="gallery-modal-nav gallery-modal-nav-left gallery-modal-nav-dark"
              onClick={() => moveModal(-1)}
              aria-label="Show previous project"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-modal-nav gallery-modal-nav-right gallery-modal-nav-dark"
              onClick={() => moveModal(1)}
              aria-label="Show next project"
            >
              ›
            </button>
            <button
              type="button"
              className="gallery-modal-close gallery-modal-close-dark"
              onClick={() => setActiveIndex(null)}
              aria-label="Close preview"
            >
              ×
            </button>
            <div className="gallery-modal-media gallery-modal-media-social">
              {activeItem.thumbnail ? (
                <img className="social-modal-image" src={activeItem.modalImage || activeItem.thumbnail} alt={activeItem.title} decoding="async" />
              ) : (
                <div className="social-placeholder gallery-placeholder-modal">
                  <span>{activeItem.platform}</span>
                  <strong>Featured content</strong>
                </div>
              )}
            </div>
            <div className="gallery-modal-copy gallery-modal-copy-dark">
              <p className="gallery-tag">{activeItem.platform}</p>
              <h3>{activeItem.title}</h3>
              {!!activeItem.description && <p>{activeItem.description}</p>}
              <p className="social-modal-metric">{activeItem.metric}</p>
              {!!activeItem.links?.length && (
                <div className="portfolio-link-list portfolio-link-list-dark" aria-label={`${activeItem.title} links`}>
                  {activeItem.links.map((link) => (
                    <a key={link.href} className="portfolio-link portfolio-link-dark" href={link.href} target="_blank" rel="noreferrer">
                      <span className="portfolio-link-label">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
              <a className="gallery-modal-profile-link" href={activeItem.link} target="_blank" rel="noreferrer">
                View profile ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
