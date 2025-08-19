import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

function Contact() {

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setSubmitStatus('success')
        form.current.reset()
      })
      .catch(() => setSubmitStatus('error'))
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
        className="contact-header"
      >
        <h1 className='contact-title'>Contact Us</h1>
        <p className="page-subtitle">Get in touch with the Boise Analog Club</p>
      </motion.div>

      <div className="contact-content">
        <motion.div 
          className="contact-form-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  id="user_name" 
                  name="user_name" 
                  placeholder="Your name" 
                  className="form-input pill-input"
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="user_email" 
                  name="user_email" 
                  placeholder="Your email" 
                  className="form-input pill-input"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                placeholder="Your message"
                className="form-textarea pill-input"
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="form-status success">Thanks! We'll get back to you soon.</div>
            )}
            {submitStatus === 'error' && (
              <div className="form-status error">Something went wrong. Please try again.</div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact