import { useEffect } from 'react'

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Accessibility plumbing shared by the lightbox dialogs: lock body scroll, move
// focus into the panel on open, trap Tab within it, and restore focus to the
// trigger on close. Mark the preferred initial element with `data-autofocus`.
export default function useModalA11y(isOpen, panelRef) {
  useEffect(() => {
    if (!isOpen) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusRaf = requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) return
      const target =
        panel.querySelector('[data-autofocus]') || panel.querySelector(FOCUSABLE_SELECTOR)
      ;(target || panel).focus?.()
    })

    const trapFocus = (event) => {
      if (event.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return

      const focusables = Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.disabled && el.offsetParent !== null,
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', trapFocus)

    return () => {
      cancelAnimationFrame(focusRaf)
      document.removeEventListener('keydown', trapFocus)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus?.()
      }
    }
  }, [isOpen, panelRef])
}
