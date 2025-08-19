import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import emailjs from '@emailjs/browser'
import { Calendar, Clock, MapPin } from 'lucide-react'

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const Events = () => {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  
  const [rsvpData, setRsvpData] = useState({})
  const [showRsvpModal, setShowRsvpModal] = useState(false)
  const [currentEventId, setCurrentEventId] = useState(null)
  const [rsvpName, setRsvpName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const upcomingEvents = [
    {
      id: 1,
      title: "Western Idaho Fair Photo Walk",
      date: "Sunday August 24th",
      time: "7:30pm",
      location: "5610 N Glenwood St, Boise, ID 83714",
      description: "We are partnering with Lenses and Brushes to co-host our first group meet! Join us for a leisurely walk through the fair grounds. We will be meeting in front of the gates at 7:30pm. All are welcome to join, this is an inclusive environment. All skill levels and digital shooters are welcome.",
      bringYourOwn: "Film camera, extra rolls of film, comfortable walking shoes, water",
      startDate: "2024-08-24",
      startTime: "19:30",
      endTime: null
    }
  ]

  // Load RSVP data on component mount
  useEffect(() => {
    loadRsvpData()
  }, [])

  const loadRsvpData = async () => {
    try {
      const { data, error } = await supabase
        .from('event_rsvps')
        .select('event_id, name')
      
      if (error) throw error
      
      // Group RSVPs by event_id
      const groupedData = data.reduce((acc, rsvp) => {
        if (!acc[rsvp.event_id]) {
          acc[rsvp.event_id] = { attendees: [], count: 0 }
        }
        acc[rsvp.event_id].attendees.push({ name: rsvp.name })
        acc[rsvp.event_id].count++
        return acc
      }, {})
      
      setRsvpData(groupedData)
    } catch (error) {
      console.error('Error loading RSVP data:', error)
    }
  }

  const handleRsvpClick = (eventId) => {
    setCurrentEventId(eventId)
    setShowRsvpModal(true)
  }

  const sendRsvpNotification = async (eventTitle, rsvpName) => {
    try {
      const templateParams = {
        user_name: rsvpName,
        user_email: 'boiseanalogclub@gmail.com',
        subject: `New RSVP for ${eventTitle}`,
        message: `${rsvpName} has RSVP'd for the event: ${eventTitle}`
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      
      console.log('RSVP notification sent successfully')
    } catch (error) {
      console.error('Error sending RSVP notification:', error)
      // Don't show error to user since RSVP was still saved
    }
  }

  const handleRsvpSubmit = async () => {
    if (!rsvpName.trim()) return
    
    setIsSubmitting(true)
    try {
      // Check if this person has already RSVP'd for this event
      const { data: existingRsvp, error: checkError } = await supabase
        .from('event_rsvps')
        .select('id')
        .eq('event_id', currentEventId)
        .eq('name', rsvpName.trim())
        .single()
      
      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is what we want
        throw checkError
      }
      
      if (existingRsvp) {
        alert('You have already RSVP\'d for this event!')
        setRsvpName('')
        setShowRsvpModal(false)
        setCurrentEventId(null)
        setIsSubmitting(false)
        return
      }
      
      // Save RSVP to database
      const { error } = await supabase
        .from('event_rsvps')
        .insert([
          {
            event_id: currentEventId,
            name: rsvpName.trim(),
            created_at: new Date().toISOString()
          }
        ])
      
      if (error) throw error
      
      // Find the event title for the email
      const currentEvent = upcomingEvents.find(event => event.id === currentEventId)
      
      // Send email notification
      if (currentEvent) {
        await sendRsvpNotification(currentEvent.title, rsvpName.trim())
      }
      
      // Update local state
      setRsvpData(prev => ({
        ...prev,
        [currentEventId]: {
          attendees: [...(prev[currentEventId]?.attendees || []), { name: rsvpName.trim() }],
          count: (prev[currentEventId]?.count || 0) + 1
        }
      }))
      
      setRsvpName('')
      setShowRsvpModal(false)
      setCurrentEventId(null)
      
      // Show success message
      alert('RSVP submitted successfully! The organizers have been notified.')
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('Failed to submit RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRsvpCancel = () => {
    setRsvpName('')
    setShowRsvpModal(false)
    setCurrentEventId(null)
  }

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
        {/* Removed: <h2>Upcoming Events</h2> */}
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
                {rsvpData[event.id]?.count > 0 && (
                  <div className="rsvp-counter">
                    {rsvpData[event.id].count} attending
                  </div>
                )}
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
              
              <div className="event-actions">
                <button 
                  className="btn"
                  onClick={() => handleRsvpClick(event.id)}
                >
                  RSVP
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div className="modal-overlay">
          <motion.div 
            className="rsvp-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h3>RSVP for Event</h3>
            </div>
            <div className="modal-content">
              <p>Please enter your name to RSVP:</p>
              <input
                type="text"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Your name"
                className="retro-input"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleRsvpSubmit()}
              />
            </div>
            <div className="modal-actions">
              <button 
                className="btn"
                onClick={handleRsvpSubmit}
                disabled={!rsvpName.trim() || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Confirm RSVP'}
              </button>
              <button 
                className="btn"
                onClick={handleRsvpCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Event Guidelines Section */}
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
