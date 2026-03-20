export default function WorkDirectory({ workDirectory }) {
  return (
    <section className="work-directory" id="my-work">
      <div className="container">
        <div className="work-directory-heading">
          <p className="section-label">Section Navigation</p>
          <h2 className="work-directory-title" aria-label="My Work">
            <span className="work-directory-script">M</span><span className="title-rest">y Work</span>
          </h2>
        </div>

        <div className="work-directory-grid">
          {workDirectory.map((item) => (
            <article key={item.href} className="work-directory-card">
              <a href={item.href} className="work-directory-link">
                <div className="work-directory-media">
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <div className={`work-directory-placeholder ${item.placeholderClass || ''}`}>
                      <span>{item.placeholderLabel}</span>
                    </div>
                  )}
                </div>
                <div className="work-directory-body">
                  <h3>{item.title}</h3>
                  <span className="work-directory-button">View section</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
