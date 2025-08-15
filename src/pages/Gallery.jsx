import React from 'react'
import { motion } from 'framer-motion'

const Gallery = () => {
  const images = [
    { src: '/Images/AD91D45A-C6F3-4947-AE86-45D98A009ED6.JPG', photographer: '@mcgillis_captures' },
    { src: '/Images/17276 08072025 4-013.JPG', photographer: '@forrest.tindall' },
    { src: '/Images/IMG_0842.JPG', photographer: '@aidan.cleve' },
    
    
    { src: '/Images/IMG_0919.JPG', photographer: '@exhausted_imagery' },
    
    
    { src: '/Images/EA527AD7-6AE5-4797-9ABA-7BED5A35EEED.JPG', photographer: '@mcgillis_captures' },
    { src: '/Images/IMG_0810.JPG', photographer: '@aidan.cleve' },
    { src: '/Images/IMG_0840.JPG', photographer: '@aidan.cleve' },
    { src: '/Images/4921C783-EBD7-4332-8099-C55CFE43D956.JPG', photographer: '@mcgillis_captures' },
    { src: '/Images/05D45C51-66EA-4AC0-9D06-1A23B744C9CC.JPG', photographer: '@forrest.tindall' },
    { src: '/Images/IMG_0920.JPG', photographer: '@exhausted_imagery' },
    { src: '/Images/img20250804_13240186.JPG', photographer: '@forrest.tindall' }
  ]

  return (
    <div className="page gallery-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Member Gallery</h1>
        <p className="page-subtitle">Showcasing the incredible work of our film photography community</p>
      </motion.div>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img 
              src={image.src} 
              alt={image.title}
            />
            <div className="gallery-overlay">
              <h3>{image.title}</h3>
              <p>by {image.photographer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery