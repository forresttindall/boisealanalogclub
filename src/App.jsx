import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import StartMenu from './components/StartMenu'
import Window from './components/Window'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import Events from './pages/Events'
import Contact from './pages/Contact'
import About from './pages/About'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [openWindows, setOpenWindows] = useState(['home'])
  const [activeWindow, setActiveWindow] = useState('home')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const openWindow = (windowId) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId])
    }
    setActiveWindow(windowId)
    setShowStartMenu(false)
  }

  const closeWindow = (windowId) => {
    const newOpenWindows = openWindows.filter(id => id !== windowId)
    setOpenWindows(newOpenWindows)
    if (activeWindow === windowId && newOpenWindows.length > 0) {
      setActiveWindow(newOpenWindows[newOpenWindows.length - 1])
    }
  }

  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu)
  }

  const windows = {
    home: { title: 'Boise Analog Club - Welcome', icon: '/Images/home.png', component: Home },
    gallery: { title: 'Photo Gallery', icon: '/Images/gallery.png', component: Gallery },
    blog: { title: 'Club Blog', icon: '/Images/blog.png', component: Blog },
    contact: { title: 'Contact Us', icon: '/Images/contact.png', component: Contact },
    events: { title: 'Upcoming Events', icon: '/Images/events.png', component: Events },
    about: { title: 'About Us', icon: '/Images/about.png', component: About }
  }

  return (
    <div className="app">
      <Desktop openWindow={openWindow} />
      
      <div className="window-manager">
        <AnimatePresence>
          {openWindows.map((windowId, index) => {
            const windowConfig = windows[windowId]
            const Component = windowConfig.component
            const baseZIndex = 100 + index * 10
            const windowZIndex = activeWindow === windowId ? baseZIndex + 5 : baseZIndex
            return (
              <Window
                key={windowId}
                id={windowId}
                title={windowConfig.title}
                icon={windowConfig.icon}
                isActive={activeWindow === windowId}
                onClose={() => closeWindow(windowId)}
                onFocus={() => setActiveWindow(windowId)}
                zIndex={windowZIndex}
              >
                <Component openWindow={openWindow} />
              </Window>
            )
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showStartMenu && (
          <StartMenu
            onItemClick={openWindow}
            onClose={() => setShowStartMenu(false)}
          />
        )}
      </AnimatePresence>

      <Taskbar
        currentTime={currentTime}
        onStartClick={toggleStartMenu}
        openWindows={openWindows}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        windows={windows}
      />
    </div>
  )
}

export default App