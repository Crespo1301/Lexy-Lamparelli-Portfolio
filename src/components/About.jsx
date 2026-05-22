import { useRef } from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function About({ about }) {
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef)

  return (
    <section className="bio-section" id="about" ref={sectionRef}>
      <div className="container bio-grid">
        <div className="bio-copy" data-reveal>
          <p className="section-label">Introduction</p>
          <h2 className="bio-title">
            <span className="bio-script">B</span>{' '}<span className="title-rest">iography</span>
          </h2>

          <div className="bio-paragraphs">
            {about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="bio-visual" data-reveal style={{ '--reveal-delay': '120ms' }}>
          <span className="badge badge-top">{about.badges.role}</span>
          <span className="badge badge-left">{about.badges.tiktok}</span>

          <div className="portrait-card">
            <div className="portrait-frame">
              {about.portraitImage ? (
                <img src={about.portraitImage} alt={`${about.name} portrait`} />
              ) : (
                <div className="portrait-placeholder">
                  <span>Drop portrait here</span>
                </div>
              )}
            </div>
          </div>

          <span className="badge badge-bottom-center">{about.badges.handle}</span>
          <span className="badge badge-bottom-right">{about.badges.instagram}</span>

          <svg className="spark spark-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M12 0 14.6 9.4 24 12 14.6 14.6 12 24 9.4 14.6 0 12 9.4 9.4Z" />
          </svg>
          <svg className="spark spark-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M12 0 14.6 9.4 24 12 14.6 14.6 12 24 9.4 14.6 0 12 9.4 9.4Z" />
          </svg>
          <svg className="spark spark-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M12 0 14.6 9.4 24 12 14.6 14.6 12 24 9.4 14.6 0 12 9.4 9.4Z" />
          </svg>
        </div>
      </div>
    </section>
  )
}
