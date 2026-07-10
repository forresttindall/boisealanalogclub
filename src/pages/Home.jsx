import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import NewsletterBlock from '../components/NewsletterBlock'

const initiatives = [
  {
    title: 'Photo Walks',
    copy: 'Slow walks through Boise with film, point-and-shoots, rangefinders, half-frames, and whatever else you brought that day.',
  },
  {
    title: 'Meetups',
    copy: 'Conversation-first gatherings for swaps, critiques, zines, and the kind of process talk that rarely fits on social media.',
  },
  {
    title: 'Guest Sessions',
    copy: 'Occasional talks, skill shares, and pop-up mini workshops around scanning, color, sequencing, and looking closely.',
  },
  {
    title: 'Community Archive',
    copy: 'A growing visual record of Boise seen through film by the people actually moving through it.',
  },
]

const galleryImages = [
  { src: '/Images/Will10-26529.jpg', credit: '@will.k.burkhart' },
  { src: '/Images/gasstation.jpg', credit: '@forrest.tindall' },
  { src: '/Images/AD91D45A-C6F3-4947-AE86-45D98A009ED6.JPG', credit: '@mcgillis_captures' },
  { src: '/Images/1.jpg', credit: '@forrest.tindall' },
  { src: '/Images/IMG_0919.JPG', credit: '@exhausted_imagery' },
  { src: '/Images/EA527AD7-6AE5-4797-9ABA-7BED5A35EEED.JPG', credit: '@mcgillis_captures' },
  { src: '/Images/IMG_0810.JPG', credit: '@aidan.cleve' },
  { src: '/Images/IMG_0840.JPG', credit: '@aidan.cleve' },
]

function Home({ navigateTo }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="page home-page">
      <motion.section
        className="section-panel hero-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="section-kicker">Boise / Film / Community</div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="section-index">01</div>
            <h1 className="hero-title">
              <span>Boise</span>
              <span>Analog</span>
              <span>Club</span>
            </h1>
            <p className="hero-text">
              A film photography club built around wandering,
              looking longer, and making physical images together.
            </p>
          </div>

          <div className="hero-side">
            <div className="info-block">
              <p className="mono-label">Current Position</p>
              <p>
                A club for people who care about film, printed matter, process,
                and the social side of photography in Boise.
              </p>
            </div>

            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigateTo('events')}>
                See Events
                <ArrowUpRight size={16} />
              </button>
              <button className="ghost-button" onClick={() => navigateTo('about')}>
                Read the Club Ethos
              </button>
            </div>
          </div>
        </div>

        <div className="hero-media-grid">
          <figure className="media-card media-card-large">
            <img
              src="/Images/IMG_3141.JPG"
              alt="Boise Analog Club gathering"
              className="hero-media-image"
            />
          </figure>
          <div className="media-card media-card-text">
            <p className="mono-label">Why analog still matters</p>
            <p className="media-card-statement">
              Film changes the pace. It makes attention visible.
            </p>
            <p className="media-card-copy">
              We built this club to create space for that slower rhythm:
              shooting, talking, trading notes, and making images that feel
              lived in rather than disposable.
            </p>
          </div>
          <figure className="media-card">
            <img
              src="/Images/IMG_2438.PNG"
              alt="Boise Analog Club visual identity"
              className="hero-media-image"
            />
          </figure>
        </div>
      </motion.section>

      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">02</p>
          <div>
            <p className="mono-label">What we do</p>
            <h2 className="section-title">Community with a sharper point of view.</h2>
          </div>
        </div>

        <div className="feature-grid">
          {initiatives.map((initiative) => (
            <article className="feature-card" key={initiative.title}>
              <h3>{initiative.title}</h3>
              <p>{initiative.copy}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55 }}
      >
        <NewsletterBlock />
      </motion.div>

      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">04</p>
          <div>
            <p className="mono-label">Member Gallery</p>
            <h2 className="section-title">Frames from the club archive.</h2>
          </div>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <figure className="gallery-card" key={`${image.src}-${image.credit}`}>
              <img src={image.src} alt={`Photo by ${image.credit}`} />
              <figcaption>{image.credit}</figcaption>
            </figure>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Home
