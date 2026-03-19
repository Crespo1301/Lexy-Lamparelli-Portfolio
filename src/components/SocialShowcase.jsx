export default function SocialShowcase({ items }) {
  return (
    <section className="portfolio-section portfolio-dark" id="social-media">
      <div className="container">
        <div className="portfolio-heading-row portfolio-heading-row-dark">
          <div>
            <p className="section-label">Content Showcase</p>
            <h2 className="portfolio-title portfolio-title-light">Social Media Work</h2>
          </div>
          <p className="portfolio-intro portfolio-intro-light">
            Use this section for TikTok thumbnails, Instagram reels, campaign recaps, growth metrics, and content strategy notes.
          </p>
        </div>

        <div className="social-grid">
          {items.map((item) => (
            <article key={item.title} className="social-card">
              <div className="social-card-media">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} />
                ) : (
                  <div className="social-placeholder">
                    <span>{item.platform}</span>
                    <strong>Preview / thumbnail area</strong>
                  </div>
                )}
              </div>

              <div className="social-card-body">
                <div className="social-meta-row">
                  <p>{item.platform}</p>
                  <span>{item.metric}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.link} target="_blank" rel="noreferrer">
                  View live content ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
