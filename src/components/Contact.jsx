export default function Contact({ contact, socialLinks }) {
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-panel">
        <div>
          <p className="section-label">Contact</p>
          <h2 className="portfolio-title portfolio-title-light">{contact.heading}</h2>
          <p className="contact-copy">{contact.text}</p>
        </div>

        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <div className="contact-links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
