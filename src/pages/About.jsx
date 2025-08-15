import React from 'react'
import { motion } from 'framer-motion'

const About = ({ openWindow }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const leadership = [
    {
      name: "Forrest Tindall",
      role: "Club Founder & President",
      bio: "Began film photography in 2005, went on to have a career in product photography for a number of years receiving publishing in Popular Mechanics magazine and others. Now enjoys film photography purely as a hobby just for the enjoyment of the art.",
      camera: "Nikon F100, Konica C35, Yashica Electro 35",
      instagram: "forrest.tindall"
    }
  ]

  return (
    <div className="page about-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>About Us</h1>
        <p className="page-subtitle">Learn more about the Boise Analog Club and our mission</p>
      </motion.div>

      <motion.section 
        className="mission-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2>Our Mission</h2>
        <div className="mission-content">
          <p>
            The Boise Analog Club exists to celebrate, preserve, and share the art of film photography 
            in our digital age. We believe that analog photography offers a unique way to slow down, 
            be intentional, and connect more deeply with our craft and our community.
          </p>
          
          <p>
            Founded in june of 2025, our club brings together photographers of all skill levels who 
            share a passion for film. Whether you're drawn to the aesthetic qualities of grain and 
            color rendition, the meditative process of manual focus and exposure, or simply the joy 
            of not knowing exactly what you captured until you develop your film, you'll find kindred 
            spirits here.
          </p>
        </div>
      </motion.section>

      <motion.section 
        className="values-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2>Our Values</h2>
        <div className="values-grid">
          <motion.div className="value-item" variants={itemVariants}>
            <h3>Inclusivity</h3>
            <p>Photography is for everyone. We welcome photographers of all backgrounds, skill levels, and identities. Our community thrives on diversity and mutual respect.</p>
          </motion.div>

          <motion.div className="value-item" variants={itemVariants}>
            <h3>Learning</h3>
            <p>We believe in continuous growth and knowledge sharing. Whether you're teaching or learning, every interaction is an opportunity to expand our collective understanding.</p>
          </motion.div>

          <motion.div className="value-item" variants={itemVariants}>
            <h3>Creativity</h3>
            <p>Film photography encourages intentional, thoughtful image-making. We celebrate unique perspectives and artistic expression in all its forms.</p>
          </motion.div>

          <motion.div className="value-item" variants={itemVariants}>
            <h3>Community</h3>
            <p>Strong relationships are the foundation of our club. We prioritize building genuine connections and supporting each other's photographic journeys.</p>
          </motion.div>

          <motion.div className="value-item" variants={itemVariants}>
            <h3>Sustainability</h3>
            <p>We're committed to responsible photography practices and supporting the longevity of analog photography for future generations.</p>
          </motion.div>

          <motion.div className="value-item" variants={itemVariants}>
            <h3>Intentionality</h3>
            <p>We embrace the slower, more deliberate approach that film photography naturally encourages.</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="founders-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <h2>Leadership Team</h2>
        <div className="founders-grid">
          {leadership.map((member, index) => (
            <motion.div
              key={index}
              className="founder-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
            >
              <div className="founder-info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
                <div className="founder-camera">
                  <span>Equipment: {member.camera}</span>
                </div>
                <div className="founder-social">
                  <a 
                    href={`https://instagram.com/${member.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    <img 
                      src="/Images/instagram.png" 
                      alt="Instagram" 
                      className="instagram-icon"
                    />
                    @{member.instagram}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="join-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <h2>Join Our Community</h2>
        <div className="join-content">
          <p>
            Ready to be part of the Boise analog photography scene? We'd love to have you! 
            There are no membership fees, no requirements other than an interest in film photography, 
            and no pressure to attend every event.
          </p>
          
          <div className="join-steps">
            <div className="step">
              <h3>1. Follow Us</h3>
              <p>Stay updated on events and community news through our social media and email list.</p>
            </div>
            
            <div className="step">
              <h3>2. Attend an Event</h3>
              <p>Join us for a photo walk, workshop, or gear swap to meet the community in person.</p>
            </div>
            
            <div className="step">
              <h3>3. Share Your Work</h3>
              <p>We love seeing what our members create! Share your film photos with the group.</p>
            </div>
          </div>
          
          <div className="community-social">
            <p>Follow us on Instagram for updates, member spotlights, and inspiration:</p>
            <a 
              href="https://instagram.com/Boise.analog.club"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link community-instagram"
            >
              <img 
                src="/Images/instagram.png" 
                alt="Instagram" 
                className="instagram-icon"
              />
              @Boise.analog.club
            </a>
          </div>
          
          <div className="contact-cta">
            <p>Questions? Ideas for events? Want to get involved in organizing?</p>
            <button className="retro-button" onClick={() => openWindow('contact')}>
              Get in Touch
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default About