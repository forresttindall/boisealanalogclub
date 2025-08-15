import React from 'react'
import Window from './Window'

const WindowManager = ({ windows, openWindows, activeWindow, setActiveWindow, closeWindow }) => {
  return (
    <div className="window-manager">
      {openWindows.map((windowId, index) => {
        const windowConfig = windows[windowId]
        if (!windowConfig) return null

        const Component = windowConfig.component
        
        return (
          <Window
            key={windowId}
            id={windowId}
            title={windowConfig.title}
            icon={windowConfig.icon}
            isActive={activeWindow === windowId}
            onFocus={() => setActiveWindow(windowId)}
            onClose={() => closeWindow(windowId)}
            zIndex={1000 + index}
          >
            <Component />
          </Window>
        )
      })}
    </div>
  )
}

export default WindowManager