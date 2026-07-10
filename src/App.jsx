import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Home from './pages/Home'
import Events from './pages/Events'
import Contact from './pages/Contact'
import About from './pages/About'
import { NewsletterAdminModal } from './components/NewsletterBlock'

const getPageFromHash = (pages) => {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const pageId = window.location.hash.replace('#', '')
  return pageId && pages[pageId] ? pageId : 'home'
}

function App() {
  const pages = {
    home: { title: 'Home', component: Home },
    events: { title: 'Events', component: Events },
    about: { title: 'About', component: About },
    contact: { title: 'Contact', component: Contact },
  }

  const [currentPage, setCurrentPage] = useState(() => getPageFromHash(pages))
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)

  const navPages = Object.entries(pages).filter(([pageId]) => pageId !== 'home')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash(pages))
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (pageId) => {
    setCurrentPage(pageId)
    setIsNavOpen(false)

    if (typeof window !== 'undefined') {
      if (pageId === 'home') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      } else {
        window.location.hash = pageId
      }
    }
  }

  const CurrentComponent = pages[currentPage].component

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <button className="brand-lockup" onClick={() => navigateTo('home')}>
            <img src="/Images/ANALOG NEW.png" alt="Boise Analog Club logo" className="brand-logo" />
            <span className="brand-text">
              <span>Boise Analog Club</span>
              <span className="brand-subtext">Film community / Boise, Idaho</span>
            </span>
          </button>

          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-controls="primary-navigation"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen((open) => !open)}
          >
            {isNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav
            id="primary-navigation"
            className={`primary-nav ${isNavOpen ? 'open' : ''}`}
            aria-label="Primary"
          >
            {navPages.map(([pageId, page]) => (
              <button
                key={pageId}
                className={`nav-link ${currentPage === pageId ? 'active' : ''}`}
                onClick={() => navigateTo(pageId)}
              >
                {page.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        <div className="site-frame">
          <div className="frame-rule frame-rule-top" />
          <div className="frame-rule frame-rule-right" />
          <div className="frame-rule frame-rule-bottom" />
          <div className="frame-rule frame-rule-left" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <CurrentComponent navigateTo={navigateTo} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>Boise Analog Club / Slow images. Real people. Shared process.</p>
          <button
            type="button"
            className="footer-admin-link"
            onClick={() => setIsAdminModalOpen(true)}
          >
            newsletter admin
          </button>
        </div>
      </footer>

      <NewsletterAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  )
}

export default App
