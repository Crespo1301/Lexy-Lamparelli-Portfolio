export default function Experience({ experience }) {
  return (
    <section className="portfolio-section portfolio-light" id="experience">
      <div className="container">
        <div className="portfolio-heading-row">
          <div>
            <p className="section-label section-label-dark">Past Role</p>
            <h2 className="portfolio-title">{experience.heading}</h2>
          </div>
          <p className="portfolio-intro">{experience.intro}</p>
        </div>

        <div className="experience-grid">
          {experience.cards.map((card) => (
            <article key={card.title} className="experience-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
