import React from 'react'
import { motion } from 'framer-motion'

const Taskbar = ({ currentTime, onStartClick, openWindows, activeWindow, setActiveWindow, windows }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="taskbar">
      <motion.button
        className="start-button"
        onClick={onStartClick}
        whileHover={{ backgroundColor: '#c0c0c0' }}
        whileTap={{ scale: 0.98 }}
      >
        <img 
          className="start-icon" 
          src="/Images/windows_98_logo_by_itzzezzo_dfh0l57-pre.png" 
          alt="Windows 98 Logo"
        />
        Start
      </motion.button>

      <div className="taskbar-windows">
        {openWindows.map((windowId) => (
          <motion.button
            key={windowId}
            className={`taskbar-window ${activeWindow === windowId ? 'active' : ''}`}
            onClick={() => setActiveWindow(windowId)}
            whileHover={{ backgroundColor: '#e0e0e0' }}
          >
            <span className="window-icon">
              {windows[windowId]?.icon?.includes('.png') ? 
                <img src={windows[windowId].icon} alt="" /> : 
                windows[windowId]?.icon
              }
            </span>
            <span className="window-title-text">{windows[windowId]?.title}</span>
          </motion.button>
        ))}
      </div>

      <div className="taskbar-tray">
        <div className="taskbar-time">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  )
}

export default Taskbar