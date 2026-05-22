export default function SkillsSection({ skills }) {
  return (
    <section className="skills-section" id="skills-certifications">
      <div className="container skills-shell">
        <div className="skills-heading-wrap">
          <p className="section-label section-label-dark">Qualifications</p>
          <h2 className="skills-title" aria-label="Skills and Certifications">
            <span className="skills-title-line">
              <span className="skills-script">S</span>{'\u00A0'}<span className="title-rest">kills &amp;</span>
            </span>
            <span className="skills-title-line skills-title-line-lower">Certifications</span>
          </h2>
        </div>

        <div className="skills-grid">
          <div className="skills-copy-panel">
            <div className="degree-pill">
              <svg className="degree-pill-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M12 3 1 8l11 5 9-4.09V15h2V8L12 3zM5 13.18v3L12 20l7-3.82v-3L12 17l-7-3.82z" />
              </svg>
              <span>{skills.degree}</span>
            </div>

            <ul className="certification-list">
              {skills.certifications.map((item) => (
                <li key={item}>
                  <span className="certification-icon">◉</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="tools-grid" aria-label="Tools and platforms">
            {skills.tools.map((tool) => (
              <div key={tool} className="tool-card">
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
