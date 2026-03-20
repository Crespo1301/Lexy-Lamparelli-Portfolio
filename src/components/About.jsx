export default function About({ about }) {
  return (
    <section className="bio-section" id="about">
      <div className="container bio-grid">
        <div className="bio-copy">
          <p className="section-label">Introduction</p>
          <h2 className="bio-title">
            <span className="bio-script">B</span><span className="title-rest">iography</span>
          </h2>

          <div className="bio-paragraphs">
            {about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="bio-visual">
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

          <span className="spark spark-1">✦</span>
          <span className="spark spark-2">✦</span>
          <span className="spark spark-3">✦</span>
        </div>
      </div>
    </section>
  )
}
