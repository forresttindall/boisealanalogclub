import React from 'react'
import { motion } from 'framer-motion'

const StartMenu = ({ onItemClick, onClose }) => {
  const menuItems = [
    { id: 'home', icon: '/Images/home.png', label: 'Home' },
    { id: 'gallery', icon: '/Images/gallery.png', label: 'Gallery' },
    { id: 'blog', icon: '/Images/blog.png', label: 'Blog' },
    { id: 'events', icon: '/Images/events.png', label: 'Events' },
    { id: 'contact', icon: '/Images/contact.png', label: 'Contact' },
    { id: 'about', icon: '/Images/about.png', label: 'About' }
  ]

  return (
    <>
      <div className="start-menu-overlay" onClick={onClose} />
      <motion.div
        className="start-menu"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="start-menu-header">
          <span className="start-menu-title">Boise Analog Club</span>
        </div>
        
        <div className="start-menu-items">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="start-menu-item"
              onClick={() => onItemClick(item.id)}
              whileHover={{ backgroundColor: '#316ac5', color: 'white' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="menu-icon">
                <img src={item.icon} alt={item.label} />
              </span>
              {item.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default StartMenu