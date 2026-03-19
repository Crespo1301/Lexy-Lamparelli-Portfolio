import { useState } from 'react'

export default function Navbar({ navItems, brand }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="topbar-chip" href="#canva-work">Work Samples</a>
        <a className="topbar-brand" href="#top" aria-label={`${brand} home`}>
          {brand}
        </a>
        <div className="topbar-right">
          <span className="topbar-label">Marketing</span>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav className={`mobile-nav ${isOpen ? 'mobile-nav-open' : ''}`} aria-label="Primary navigation">
        <div className="container mobile-nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
