import React from 'react'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="page home-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="retro-title">Welcome to Boise Analog Club</h1>
        <p className="hero-subtitle">Building community through photography - film and digital welcome</p>
        
        <div className="hero-image">
          <img src="/Images/IMG_0919.JPG" alt="Film Photography" className="featured-image" />
        </div>
      </motion.div>

      <motion.div 
        className="info-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="info-card">
          <h3>Photo Walks</h3>
          <p>Join us for regular photo walks around Boise's most photogenic locations. Bring any camera - film, digital, or even your phone!</p>
        </div>
        
        <div className="info-card">
          <h3>Meetups</h3>
          <p>Connect with fellow photography enthusiasts, share techniques, and discuss your latest shots over coffee.</p>
        </div>
        
        <div className="info-card">
          <h3>Gear Swaps</h3>
          <p>Trade, sell, or buy cameras and equipment. Find that perfect lens or camera body you've been searching for.</p>
        </div>
        
        <div className="info-card">
          <h3>Events</h3>
          <p>Special workshops, darkroom sessions, and community events. All skill levels and camera types welcome!</p>
        </div>
      </motion.div>

      <motion.div 
        className="welcome-message"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2>All Are Welcome!</h2>
        <p>
          The Boise Analog Club is an inclusive community that welcomes photographers of all backgrounds, 
          skill levels, and identities. Whether you shoot film, digital, or both - you belong here. 
          Film can be expensive and we understand that. What matters most is getting out, having fun, 
          building community, and sharing our love of photography together. Our mission is to create a safe, 
          supportive space where everyone can explore the art and craft of photography in all its forms.
        </p>
      </motion.div>

      <motion.section 
        className="featured-photos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h2>Recent Club Photos</h2>
        <div className="photo-grid">
          <img src="/Images/05D45C51-66EA-4AC0-9D06-1A23B744C9CC.JPG" alt="Creative analog photography from club member" />
          <img src="/Images/17276 08072025 4-013.JPG" alt="Film photography showcasing unique perspective" />
          <img src="/Images/4921C783-EBD7-4332-8099-C55CFE43D956.JPG" alt="Artistic composition captured on film" />
          <img src="/Images/AD91D45A-C6F3-4947-AE86-45D98A009ED6.JPG" alt="Documentary style photography from member" />
          <img src="/Images/EA527AD7-6AE5-4797-9ABA-7BED5A35EEED.JPG" alt="Street photography with film aesthetic" />
          <img src="/Images/IMG_0810.JPG" alt="Urban landscape captured on analog camera" />
          <img src="/Images/IMG_0840.JPG" alt="Portrait photography with natural lighting" />
          <img src="/Images/IMG_0842.JPG" alt="Creative framing and composition" />
          <img src="/Images/IMG_0919.JPG" alt="Architecture photography on film" />
          <img src="/Images/IMG_0920.JPG" alt="Club meetup documentation" />
          <img src="/Images/img20250804_13240186.JPG" alt="Experimental photography technique" />
        </div>
      </motion.section>
    </div>
  )
}

export default Home