import { useRef } from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Experience({ experience }) {
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef, [experience.cards.length])

  return (
    <section className="portfolio-section portfolio-light" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="portfolio-heading-row" data-reveal>
          <div>
            <p className="section-label section-label-dark">Past Role</p>
            <h2 className="portfolio-title">{experience.heading}</h2>
          </div>
          <p className="portfolio-intro">{experience.intro}</p>
        </div>

        <div className="experience-grid">
          {experience.cards.map((card, index) => (
            <article
              key={card.title}
              className="experience-card"
              data-reveal
              style={{ '--reveal-delay': `${Math.min(index * 80, 240)}ms` }}
            >
              <div className="experience-card-logo" aria-label={`${card.title} logo`}>
                {card.logo ? <img src={card.logo} alt={`${card.title} logo`} loading="lazy" decoding="async" /> : <span>{card.logoLabel || 'Add company logo'}</span>}
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
