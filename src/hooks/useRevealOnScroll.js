import { useEffect } from 'react'

export default function useRevealOnScroll(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef?.current
    if (!root) return undefined

    const elements = Array.from(root.querySelectorAll('[data-reveal]'))
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [rootRef, ...deps])
}
