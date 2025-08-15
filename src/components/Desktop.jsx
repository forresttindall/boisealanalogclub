import React from 'react'
import { motion } from 'framer-motion'

const Desktop = ({ openWindow }) => {
  const desktopIcons = [
    { id: 'gallery', icon: '/Images/gallery.png', label: 'Gallery', x: 20, y: 20 },
    { id: 'blog', icon: '/Images/blog.png', label: 'Blog', x: 20, y: 120 },
    { id: 'contact', icon: '/Images/contact.png', label: 'Contact', x: 20, y: 220 },
    { id: 'events', icon: '/Images/events.png', label: 'Events', x: 20, y: 320 },
    { id: 'home', icon: '/Images/home.png', label: 'Home', x: 20, y: 420 },
    { id: 'about', icon: '/Images/about.png', label: 'About', x: 20, y: 520 }
  ]

  return (
    <div className="desktop">
      <div className="desktop-background" />
      
      <div className="desktop-icons">
        {desktopIcons.map((icon) => (
          <motion.div
            key={icon.id}
            className="desktop-icon"
            style={{ left: icon.x, top: icon.y }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWindow?.(icon.id)}
          >
            <div className="icon-image">
              <img src={icon.icon} alt={icon.label} />
            </div>
            <div className="icon-label">{icon.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Desktop