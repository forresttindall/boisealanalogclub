import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const values = [
  'Inclusivity',
  'Learning',
  'Intentionality',
  'Experimentation',
  'Community',
  'Stewardship',
]

const About = ({ navigateTo }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="page about-page">
      <motion.section
        className="section-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">04</p>
          <div>
            <p className="mono-label">About the Club</p>
            <h1 className="section-title section-title-wide">
              A film-first community for people who want more than a feed.
            </h1>
          </div>
        </div>

        <div className="split-layout">
          <div className="text-stack">
            <p className="lead-copy">
              Boise Analog Club exists to preserve the slowness, tactility, and
              social energy of analog photography in a culture that usually
              pushes everything toward speed.
            </p>
            <p>
              Founded in June 2025, the club brings together photographers of
              all skill levels who care about film as both a medium and a way
              of paying attention. We like grain, sequence, process, and the
              conversations that happen around prints, negatives, cameras, and
              walks through the city.
            </p>
            <p>
              You do not need to be an expert. You do not need a rare camera.
              You just need curiosity and a willingness to show up.
            </p>
          </div>

          <figure className="portrait-card">
            <img src="/Images/bac.png" alt="Boise Analog Club poster artwork" />
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
          <p className="section-index">05</p>
          <div>
            <p className="mono-label">Values</p>
            <h2 className="section-title">The culture we are trying to build.</h2>
          </div>
        </div>

        <div className="value-grid">
          {[
            'Photography is for everyone. We welcome photographers of all backgrounds, skill levels, and identities. Our community thrives on diversity and mutual respect.',
            "We believe in continuous growth and knowledge sharing. Whether you're teaching or learning, every interaction is an opportunity to expand our collective understanding.",
            'We embrace the slower, more deliberate approach that film photography naturally encourages.',
            'We celebrate experimentation, process, and making images that feel personal rather than optimized.',
            "Strong relationships are the foundation of our club. We prioritize building genuine connections and supporting each other's photographic journeys.",
            'We want to help sustain analog photography by keeping knowledge, tools, and enthusiasm in circulation.',
          ].map((description, index) => (
            <div className="value-card" key={values[index]}>
              <span>{values[index]}</span>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section-panel founder-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55 }}
      >
        <div className="editorial-header">
          <p className="section-index">06</p>
          <div>
            <p className="mono-label">Leadership</p>
            <h2 className="section-title">Built locally, led personally.</h2>
          </div>
        </div>

        <div className="split-layout">
          <div className="info-block founder-copy">
            <p className="mono-label">Forrest Tindall / Founder</p>
            <p>
              Forrest began shooting film as a kid with disposable cameras and
              later worked professionally in product photography, with work
              published in outlets including Popular Mechanics. Boise Analog
              Club grew from a desire to create a generous, design-aware
              community around the practice of making images on film.
            </p>
            <a
              href="https://instagram.com/Forrest.tindall"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              @Forrest.tindall
            </a>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <p className="mono-label">01 / Follow</p>
              <p>Watch the club Instagram for new walks, meetups, and open calls.</p>
            </article>
            <article className="step-card">
              <p className="mono-label">02 / Attend</p>
              <p>Come to an event with whatever camera you already have.</p>
            </article>
            <article className="step-card">
              <p className="mono-label">03 / Contribute</p>
              <p>Share work, pitch ideas, collaborate, and help shape the culture.</p>
            </article>
          </div>
        </div>

        <div className="cta-row">
          <a
            href="https://instagram.com/Boise.analog.club"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button link-button"
          >
            Follow @Boise.analog.club
            <ArrowUpRight size={16} />
          </a>
          <button className="ghost-button" onClick={() => navigateTo('contact')}>
            Start a Conversation
          </button>
        </div>
      </motion.section>
    </div>
  )
}

export default About
