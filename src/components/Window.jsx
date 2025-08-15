import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Window = ({ id, title, icon, children, isActive, onFocus, onClose, zIndex = 100 }) => {
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 50 + Math.random() * 100 })
  const [isMaximized, setIsMaximized] = useState(false)

  const handleDragEnd = (event, info) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    })
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return (
    <motion.div
      className={`window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        zIndex: zIndex,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : 'auto',
        height: isMaximized ? 'calc(100vh - 40px)' : 'auto'
      }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={handleDragEnd}
      onClick={onFocus}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="window-header" onMouseDown={onFocus}>
        <div className="window-title">
          <span className="window-icon">
            {icon.includes('.png') ? <img src={icon} alt="" /> : icon}
          </span>
          {title}
        </div>
        <div className="window-controls">
          <button className="window-control minimize" onClick={(e) => e.stopPropagation()}>
            _
          </button>
          <button className="window-control maximize" onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}>
            {isMaximized ? '❐' : '□'}
          </button>
          <button className="window-control close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
            ×
          </button>
        </div>
      </div>
      
      <div className="window-content">
        {children}
      </div>
    </motion.div>
  )
}

export default Window