import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { currentEventFlyer } from '../../shared/eventFlyer'

const eventFormats = [
  {
    title: 'Photo Walks',
    copy: 'Street-oriented walks with room for conversation, experimentation, and seeing Boise through different film stocks and formats.',
  },
  {
    title: 'Coffee Critiques',
    copy: 'Low-pressure image reviews and process conversations around sequencing, editing, scanning, and print choices.',
  },
  {
    title: 'Gear Swaps',
    copy: 'Opportunities to trade cameras, find lenses, ask questions, and keep equipment circulating through the community.',
  },
  {
    title: 'Special Sessions',
    copy: 'Guest talks, mini workshops, and occasional one-off gatherings built around whatever the community is curious about.',
  },
]

const eventNotes = [
  'All skill levels are welcome.',
  'Film is encouraged, but curiosity matters more than format.',
  'Bring your camera, some film, water, and comfortable shoes.',
  'Check Instagram before heading out in case plans shift.',
]

const Events = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="page events-page">
      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">07</p>
          <div>
            <p className="mono-label">Events</p>
            <h1 className="section-title section-title-wide">
              Upcoming Events
            </h1>
          </div>
        </div>

        <div className="split-layout">
          <figure className="poster-card event-flyer-card">
            <img src={currentEventFlyer.imagePath} alt={currentEventFlyer.imageAlt} />
          </figure>

          <div className="text-stack">
            <p className="lead-copy">
              We organize regular gatherings that feel social first and formal
              second: photo walks, casual meetups, swaps, and the occasional
              workshop or critique.
            </p>
            <p>
              The goal is simple. Make space for analog photographers in Boise
              to meet each other, trade notes, and build an actual local scene.
            </p>
            <div className="info-block">
              <p className="mono-label">Where updates happen</p>
              <p>
                New event details usually land on Instagram first, followed by
                reminders and community reposts.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">08</p>
          <div>
            <p className="mono-label">Formats</p>
            <h2 className="section-title">A rotating program, not a rigid calendar.</h2>
          </div>
        </div>

        <div className="feature-grid">
          {eventFormats.map((format) => (
            <article className="feature-card" key={format.title}>
              <h3>{format.title}</h3>
              <p>{format.copy}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">09</p>
          <div>
            <p className="mono-label">Guidelines</p>
            <h2 className="section-title">What to expect when you come out.</h2>
          </div>
        </div>

        <div className="notes-grid">
          {eventNotes.map((note, index) => (
            <article className="note-card" key={note}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Events
