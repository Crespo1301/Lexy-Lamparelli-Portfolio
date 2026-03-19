import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import CanvaGallery from './components/CanvaGallery'
import SocialShowcase from './components/SocialShowcase'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { siteContent } from './data/siteContent'

export default function App() {
  return (
    <div className="site-shell">
      <Navbar navItems={siteContent.navItems} brand={siteContent.hero.name} />
      <main>
        <Hero hero={siteContent.hero} />
        <About about={siteContent.about} />
        <CanvaGallery items={siteContent.canvaProjects} />
        <SocialShowcase items={siteContent.socialProjects} />
        <Experience experience={siteContent.experience} />
        <Contact contact={siteContent.contact} socialLinks={siteContent.socialLinks} />
      </main>
      <Footer name={siteContent.hero.name} />
    </div>
  )
}
