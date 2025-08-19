import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'



const About = ({ openWindow }) => {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
        className="home-typo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="home-typo-title">Our Values</h2>
        <div className="home-features">
          <motion.div className="feature" variants={itemVariants}>
            <h3 className='feature-title'>Inclusivity</h3>
            <p className='feature-desc'>Photography is for everyone. We welcome photographers of all backgrounds, skill levels, and identities. Our community thrives on diversity and mutual respect.</p>
          </motion.div>

          <motion.div className="feature" variants={itemVariants}>
            <h3 className='feature-title'>Learning</h3>
            <p className='feature-desc'>We believe in continuous growth and knowledge sharing. Whether you're teaching or learning, every interaction is an opportunity to expand our collective understanding.</p>
          </motion.div>

          <motion.div className="feature" variants={itemVariants}>
            <h3 className='feature-title'>Creativity</h3>
            <p className='feature-desc'>Film photography encourages intentional, thoughtful image-making. We celebrate unique perspectives and artistic expression in all its forms.</p>  
          </motion.div>

          <motion.div className="feature" variants={itemVariants}>
            <h3 className='feature-title'>Community</h3>
            <p className='feature-desc'>Strong relationships are the foundation of our club. We prioritize building genuine connections and supporting each other's photographic journeys.</p>
          </motion.div>

          <motion.div className="feature" variants={itemVariants}>
            <h3 className='feature-title'>Sustainability</h3>
            <p className='feature-desc'>We're committed to responsible photography practices and supporting the longevity of analog photography for future generations.</p>
          </motion.div>

          <motion.div className="feature" variants={itemVariants}>
            <h3 className='feature-title'>Intentionality</h3>
            <p className='feature-desc'>We embrace the slower, more deliberate approach that film photography naturally encourages.</p>
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
                <h3 className='feature-title'>{member.name}</h3>
                <h4>{member.role}</h4>
                <p className='feature-desc'>{member.bio}</p>
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
                    <Instagram className="instagram-icon" aria-hidden="true" />
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
                 <a 
              href="https://instagram.com/Boise.analog.club"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link community-instagram"
            >
              <Instagram className="instagram-icon" aria-hidden="true" />
              @Boise.analog.club
            </a>
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
          

          
          <div className="contact-cta">
            <div>
            <p className="contact-cta">Questions? Ideas for events? Want to get involved in organizing?</p>
            <button className="btn" onClick={() => openWindow('contact')}>
              Get in Touch
            </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default About