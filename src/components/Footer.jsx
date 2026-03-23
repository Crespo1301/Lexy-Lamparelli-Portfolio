export default function Footer({ name }) {
  return (
    <footer className="footer">
      <div className="container footer-inner footer-inner-top">
        <p>© {new Date().getFullYear()} {name}</p>
        <div className="footer-links">
          <a href="/readme.html">Project README</a>
          <a href="#top">Back to top</a>
        </div>
      </div>
      <div className="container footer-inner footer-inner-bottom">
        <p className="footer-credit">
          Designed and developed by <a href="https://carloscrespo.info/" target="_blank" rel="noreferrer">CSolutions — Boston Office</a>
        </p>
      </div>
    </footer>
  )
}
