import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

const Events = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  

  return (
    <div className="page events-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-image">
          <img src="/Images/bac may no 2.png" alt="Boise Analog Club Event Flyer" className="featured-image" />
        </div>
      </motion.div>

      <motion.section 
        className="event-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <h2 className="home-typo-title">Event Guidelines</h2>
        <div className="home-features">
          <div className="feature">
            <h3 className="feature-title">All Skill Levels Welcome</h3>
            <p className="feature-desc">Whether you're just starting with film photography or you're a seasoned pro, our events are designed to be inclusive and educational for everyone.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Bring Your Camera</h3>
            <p className="feature-desc">Don't forget your camera and some film! We'll have opportunities to shoot and share techniques throughout our events.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Community First</h3>
            <p className="feature-desc">Our events are about building connections and learning from each other. Come ready to share, learn, and make new friends.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Stay Updated</h3>
            <p className="feature-desc">Event details may change due to weather or other factors. Make sure to check your email and our social media for updates.</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Events
