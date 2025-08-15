import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Function to play the "You've got mail" sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/Images/youvegotmail.mp3')
      audio.volume = 0.5 // Set volume to 50% to not be too loud
      audio.play().catch(error => {
        console.log('Audio playback failed:', error)
      })
    } catch (error) {
      console.log('Audio not supported:', error)
    }
  }

  // Play sound when component mounts
  useEffect(() => {
    // Small delay to ensure the window has opened
    const timer = setTimeout(() => {
      playNotificationSound()
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    // Use environment variables for EmailJS credentials
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log(result.text)
      setSubmitStatus('success')
      form.current.reset()
    }, (error) => {
      console.log(error.text)
      setSubmitStatus('error')
    })
    .finally(() => {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    })
  }

  return (
    <div className="page contact-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Contact Us</h1>
        <p className="page-subtitle">Get in touch with the Boise Analog Club</p>
      </motion.div>

      <div className="contact-content">
        <motion.div 
          className="contact-form-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2>Send us a message</h2>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <label htmlFor="user_name">Name *</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                className="retro-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Email *</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                className="retro-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="retro-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="retro-textarea"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`retro-button submit-button ${isSubmitting ? 'submitting' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <motion.div
                className="status-message success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="status-message error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ❌ Failed to send message. Please try again or email us directly.
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div 
          className="contact-info-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Get Involved</h2>
          
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <p>boiseanalogclub@gmail.com</p>
              <p>For general inquiries, event questions, or collaboration opportunities.</p>
            </div>

            <div className="info-item">
              <h3>Social Media</h3>
              <p>Follow us on Instagram @Boise.Analog.Club for daily inspiration and event updates.</p>
            </div>

            <div className="info-item">
              <h3>Meetups</h3>
              <p>We meet regularly for workshops and social gatherings. Check our Events page for upcoming meetups.</p>
            </div>

            <div className="info-item">
              <h3>What to Expect</h3>
              <ul>
                <li>Photowalks</li>
                <li>Trips</li>
                <li>Workshops</li>
                <li>Film development workshops</li>
                <li>Gear swap meets</li>
                <li>Events</li>
              </ul>
            </div>
          </div>

          <div className="join-info">
            <h3>Join Our Community</h3>
            <p>
              Whether you're a complete beginner or a seasoned film photographer, 
              you're welcome in our community. We believe in learning together, 
              sharing knowledge, and celebrating the unique qualities that make 
              analog photography special.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact