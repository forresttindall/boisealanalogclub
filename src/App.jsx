import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'

import Blog from './pages/Blog'
import Events from './pages/Events'
import Contact from './pages/Contact'
import About from './pages/About'
import { Menu, X } from 'lucide-react'

function App() {
  // remove time/start menu/window states and handlers
  const [currentPage, setCurrentPage] = useState('home')
  const [isNavOpen, setIsNavOpen] = useState(false)

  const pages = {
    home: { title: 'Home', component: Home },
    events: { title: 'Events', component: Events },
    blog: { title: 'Blog', component: Blog },
    about: { title: 'About', component: About },
    contact: { title: 'Contact', component: Contact },
  }

  // Remove 'home' from the nav links but keep it in pages for routing
  const navPages = {
    events: { title: 'Events', component: Events },
    blog: { title: 'Blog', component: Blog },
    about: { title: 'About', component: About },
    contact: { title: 'Contact', component: Contact },
  }

  const navigateTo = (pageId) => {
    setCurrentPage(pageId)
    setIsNavOpen(false) // close mobile menu on navigation
  }

  const CurrentComponent = pages[currentPage].component

  return (
    <div className="app">
      {/* Floating nav replaces Desktop/Taskbar/StartMenu */}
      <nav className="floating-nav">
        <div className="nav-container">
          <motion.div 
            className="nav-logo" 
            whileHover={{ scale: 1.05 }}
            onClick={() => navigateTo('home')}
            style={{ cursor: 'pointer' }}
          >
            Boise Analog
          </motion.div>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-controls="primary-navigation"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen((v) => !v)}
          >
            {isNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <ul
            id="primary-navigation"
            className={`nav-links ${isNavOpen ? 'open' : ''}`}
          >
            {Object.entries(navPages).map(([pageId, page]) => (
              <li key={pageId}>
                <motion.button
                  className={`nav-link ${currentPage === pageId ? 'active' : ''}`}
                  onClick={() => navigateTo(pageId)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page.title}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <div className={`container`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentComponent navigateTo={navigateTo} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default App