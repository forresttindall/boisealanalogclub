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
  const [windowOrder, setWindowOrder] = useState(['home']) // Add this new state

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const openWindow = (windowId) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId])
      setWindowOrder([...windowOrder.filter(id => id !== windowId), windowId]) // Add to end
    } else {
      // Move existing window to front
      setWindowOrder([...windowOrder.filter(id => id !== windowId), windowId])
    }
    setActiveWindow(windowId)
    setShowStartMenu(false)
  }

  const closeWindow = (windowId) => {
    const newOpenWindows = openWindows.filter(id => id !== windowId)
    const newWindowOrder = windowOrder.filter(id => id !== windowId)
    setOpenWindows(newOpenWindows)
    setWindowOrder(newWindowOrder)
    if (activeWindow === windowId && newWindowOrder.length > 0) {
      setActiveWindow(newWindowOrder[newWindowOrder.length - 1])
    }
  }

  // Add this new function to handle window focusing
  const focusWindow = (windowId) => {
    setActiveWindow(windowId)
    setWindowOrder([...windowOrder.filter(id => id !== windowId), windowId])
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
          {openWindows.map((windowId) => {
            const windowConfig = windows[windowId]
            const Component = windowConfig.component
            const orderIndex = windowOrder.indexOf(windowId)
            const windowZIndex = 100 + orderIndex * 10 // Base z-index on order, not array index
            return (
              <Window
                key={windowId}
                id={windowId}
                title={windowConfig.title}
                icon={windowConfig.icon}
                isActive={activeWindow === windowId}
                onClose={() => closeWindow(windowId)}
                onFocus={() => focusWindow(windowId)} // Use new focus function
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
        setActiveWindow={focusWindow} // Use focusWindow instead of setActiveWindow
        windows={windows}
      />
    </div>
  )
}

export default App