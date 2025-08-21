import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

function Home() {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);



  return (
    <div className="page home-page">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Boise Analog Club</h1>
        <p className="hero-subtitle">
          Building community through film photography
        </p>

        <div className="hero-image">
          <img src="/Images/IMG_0919.JPG" alt="Film Photography" className="featured-image" />
          <span className="hero-credit">@exhausted_imagery</span>
        </div>
      </motion.div>

      {/* Typographic-forward section (replaces info cards) */}
      <motion.section
        className="home-typo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        <h2 className="home-typo-title">What we do</h2>
        <div className="home-features">
          <div className="feature">
            <h3 className="feature-title">Photo Walks</h3>
            <p className="feature-desc">Join regular walks around Boise’s most photogenic locations. Bring any camera — film, digital, or phone.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Meetups</h3>
            <p className="feature-desc">Connect with fellow photographers, share techniques, and discuss your latest shots over coffee.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Gear Swaps</h3>
            <p className="feature-desc">Trade, sell, or buy cameras and equipment. Find that perfect lens or camera body you’ve been searching for.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Events</h3>
            <p className="feature-desc">Workshops, guest talks, and special community shoots coming up throughout the year.</p>
          </div>
        </div>
      </motion.section>

      {/* Gallery moved to Home page */}
      <motion.section
        className="home-gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="home-gallery-title">Member Gallery</h2>
        <div className="home-gallery-wrap">
          <div className="home-gallery-grid">
            {[
              { src: '/Images/AD91D45A-C6F3-4947-AE86-45D98A009ED6.JPG', photographer: '@mcgillis_captures' },
              { src: '/Images/1.jpg', photographer: '@forrest.tindall' },
              { src: '/Images/IMG_0842.JPG', photographer: '@aidan.cleve' },
              { src: '/Images/IMG_0919.JPG', photographer: '@exhausted_imagery' },
              { src: '/Images/EA527AD7-6AE5-4797-9ABA-7BED5A35EEED.JPG', photographer: '@mcgillis_captures' },
              { src: '/Images/IMG_0810.JPG', photographer: '@aidan.cleve' },
              { src: '/Images/IMG_0840.JPG', photographer: '@aidan.cleve' },
              { src: '/Images/4921C783-EBD7-4332-8099-C55CFE43D956.JPG', photographer: '@mcgillis_captures' },
              { src: '/Images/05D45C51-66EA-4AC0-9D06-1A23B744C9CC.JPG', photographer: '@forrest.tindall' },
              { src: '/Images/IMG_0920.JPG', photographer: '@exhausted_imagery' },
              { src: '/Images/5.jpg', photographer: '@forrest.tindall' },
            ].map((image, index) => (
              <div
                className="home-gallery-item"
                key={index}
                data-credit={`Photo by ${image.photographer}`}
              >
                <img src={image.src} alt={image.photographer} />
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home