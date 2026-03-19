export default function CanvaGallery({ items }) {
  return (
    <section className="portfolio-section portfolio-light" id="canva-work">
      <div className="container">
        <div className="portfolio-heading-row">
          <div>
            <p className="section-label section-label-dark">Featured Section</p>
            <h2 className="portfolio-title">Canva Work</h2>
          </div>
          <p className="portfolio-intro">
            Drop in her best flyers, promos, branded layouts, carousel slides, or event graphics here. The cards are set up to
            look editorial and visual-first.
          </p>
        </div>

        <div className="gallery-grid">
          {items.map((item) => (
            <article key={item.title} className="gallery-card">
              <div className="gallery-media">
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <div className="gallery-placeholder">
                    <span>{item.imageLabel}</span>
                  </div>
                )}
              </div>
              <div className="gallery-card-body">
                <p className="gallery-tag">{item.category}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
