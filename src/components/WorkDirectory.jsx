export default function WorkDirectory({ workDirectory }) {
  return (
    <section className="work-directory" id="my-work">
      <div className="container">
        <div className="work-directory-heading">
          <p className="section-label">Explore</p>
          <h2 className="work-directory-title" aria-label="My Work">
            <span className="work-directory-script">M</span>{' '}<span className="title-rest">y Work</span>
          </h2>
        </div>

        <div className="work-directory-grid">
          {workDirectory.map((item, index) => (
            <article key={item.href} className="work-directory-card">
              <a href={item.href} className="work-directory-link">
                <span className="work-directory-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="work-directory-body">
                  <h3>{item.title}</h3>
                  {item.meta ? <span className="work-directory-meta">{item.meta}</span> : null}
                  <span className="work-directory-view">
                    View
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
