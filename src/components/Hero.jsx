export default function Hero({ hero }) {
  return (
    <section className="cover-section" id="top">
      <div className="container cover-shell">
        <div className="cover-title-wrap">
          <p className="cover-kicker cover-kicker-left">Work Samples</p>
          <p className="cover-kicker cover-kicker-right">Marketing</p>

          <h1 className="cover-title" aria-label="Marketing Portfolio">
            <span className="cover-title-line">
              <span className="cover-script">M</span>
              <span>arketing</span>
            </span>
            <span className="cover-title-line cover-title-line-lower">Portfolio</span>
          </h1>

          <div className="cover-credit">
            <p>{hero.creditPrefix}</p>
            <h2>{hero.name}</h2>
            <a href={hero.handleUrl} target="_blank" rel="noreferrer">
              {hero.handle}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
