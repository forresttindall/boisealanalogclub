import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import emailjs from '@emailjs/browser'

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

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
      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">10</p>
          <div>
            <p className="mono-label">Contact</p>
            <h1 className="section-title section-title-wide">
              Pitch a meetup, ask a question, or just introduce yourself.
            </h1>
          </div>
        </div>

        <div className="contact-grid">
          <div className="text-stack">
            <p className="lead-copy">
              Reach out if you want to join the club, collaborate on an event,
              share work, or help shape the Boise analog scene.
            </p>

            <div className="info-block">
              <p className="mono-label">Best for</p>
              <p>Event ideas, collaborations, member questions, and club updates.</p>
            </div>

            <a
              href="https://instagram.com/Boise.analog.club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              @Boise.analog.club
              <ArrowUpRight size={16} />
            </a>
          </div>

          <motion.div
            className="form-panel"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user_name" className="mono-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    placeholder="Your name"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user_email" className="mono-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    placeholder="Your email"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="mono-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  placeholder="Tell us what you're thinking."
                  className="form-input form-textarea"
                  required
                />
              </div>

              <button type="submit" className="primary-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <ArrowUpRight size={16} />
              </button>

              {submitStatus === 'success' && (
                <div className="form-status success">Thanks. We will get back to you soon.</div>
              )}
              {submitStatus === 'error' && (
                <div className="form-status error">Something went wrong. Please try again.</div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Contact
