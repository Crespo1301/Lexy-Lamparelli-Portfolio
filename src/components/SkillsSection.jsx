export default function SkillsSection({ skills }) {
  return (
    <section className="skills-section" id="skills-certifications">
      <div className="container skills-shell">
        <div className="skills-heading-wrap">
          <p className="section-label section-label-dark">Qualifications</p>
          <h2 className="skills-title" aria-label="Skills and Certifications">
            <span className="skills-title-line">
              <span className="skills-script">S</span><span className="title-rest">kills &amp;</span>
            </span>
            <span className="skills-title-line skills-title-line-lower">Certifications</span>
          </h2>
        </div>

        <div className="skills-grid">
          <div className="skills-copy-panel">
            <div className="degree-pill">
              <span className="degree-pill-icon">🎓</span>
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
