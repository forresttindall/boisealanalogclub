import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

const Events = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const upcomingEvents = [
    {
      id: 2,
      title: "West Downtown Boise",
      date: "Sunday November 16th",
      time: "11:30AM",
      location: "Rhodes Skate Park 1555 W Front St, Boise, ID 83702",
      description: " Join us for a leisurely from Rhodes Skate Park into west downtown Boise. We will be meeting at Rhodes Skate Park. All are welcome to join, this is an inclusive environment. All skill levels and digital shooters are welcome.",
      bringYourOwn: "Film camera, extra rolls of film, comfortable walking shoes, water",
      startDate: "2025-11-16",
      startTime: "11:30",
      endTime: null
    },
   
  ]

  return (
    <div className="page events-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Events</h1>
        <p className="page-subtitle">Join us for workshops, photo walks, and community gatherings</p>
      </motion.div>

      <motion.section 
        className="upcoming-events"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="events-grid">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="event-header">
                <h3>{event.title}</h3>
              </div>
              
              <div className="event-details">
                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar className="meta-icon" size={16} strokeWidth={2} />
                    <span>{event.date}</span>
                  </div>
                  <div className="meta-item">
                    <Clock className="meta-icon" size={16} strokeWidth={2} />
                    <span>{event.time}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin className="meta-icon" size={16} strokeWidth={2} />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                <div className="event-requirements">
                  <h4>What to Bring:</h4>
                  <p>{event.bringYourOwn}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="event-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <h2 className="home-typo-title">Event Guidelines</h2>
        <div className="home-features">
          <div className="feature">
            <h3 className="feature-title">All Skill Levels Welcome</h3>
            <p className="feature-desc">Whether you're just starting with film photography or you're a seasoned pro, our events are designed to be inclusive and educational for everyone.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Bring Your Camera</h3>
            <p className="feature-desc">Don't forget your camera and some film! We'll have opportunities to shoot and share techniques throughout our events.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Community First</h3>
            <p className="feature-desc">Our events are about building connections and learning from each other. Come ready to share, learn, and make new friends.</p>
          </div>
          <div className="feature">
            <h3 className="feature-title">Stay Updated</h3>
            <p className="feature-desc">Event details may change due to weather or other factors. Make sure to check your email and our social media for updates.</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Events
