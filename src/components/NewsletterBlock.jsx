import { useEffect, useState } from 'react'
import { ArrowUpRight, LogIn, LogOut, Mail, Send, ShieldCheck, X } from 'lucide-react'
import { currentEventFlyer } from '../../shared/eventFlyer'

async function readApiPayload(response) {
  const responseText = await response.text()

  if (!responseText) {
    if (response.ok) {
      return {}
    }

    throw new Error('The newsletter API returned an empty response. Restart the dev server and try again.')
  }

  try {
    return JSON.parse(responseText)
  } catch {
    throw new Error('The newsletter API did not return JSON. Restart the dev server and try again.')
  }
}

export function NewsletterAdminModal({ isOpen, onClose }) {
  const [adminPassword, setAdminPassword] = useState('')
  const [adminState, setAdminState] = useState({
    authenticated: false,
    loading: false,
    actionLoading: false,
    message: '',
    error: false,
    summary: null,
  })

  const loadAdminSummary = async () => {
    setAdminState((currentState) => ({
      ...currentState,
      loading: true,
    }))

    try {
      const response = await fetch('/api/newsletter/admin/summary', {
        credentials: 'include',
      })
      const payload = await readApiPayload(response)

      if (!response.ok) {
        setAdminState((currentState) => {
          const isUnauthorized = response.status === 401

          return {
            ...currentState,
            authenticated: isUnauthorized ? false : currentState.authenticated,
            loading: false,
            summary: isUnauthorized ? null : currentState.summary,
            message: payload.error || 'Unable to load the admin summary.',
            error: true,
          }
        })
        return
      }

      setAdminState((currentState) => ({
        ...currentState,
        authenticated: true,
        loading: false,
        summary: payload,
      }))
    } catch {
      setAdminState((currentState) => ({
        ...currentState,
        loading: false,
        message: 'Unable to reach the newsletter API.',
        error: true,
      }))
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    loadAdminSummary()

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleAdminLogin = async (event) => {
    event.preventDefault()

    setAdminState((currentState) => ({
      ...currentState,
      actionLoading: true,
      message: '',
      error: false,
    }))

    try {
      const response = await fetch('/api/newsletter/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: adminPassword }),
      })
      const payload = await readApiPayload(response)

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to log in.')
      }

      setAdminPassword('')
      await loadAdminSummary()
      setAdminState((currentState) => ({
        ...currentState,
        authenticated: true,
        actionLoading: false,
        message: 'Admin access granted.',
        error: false,
      }))
    } catch (error) {
      setAdminState((currentState) => ({
        ...currentState,
        actionLoading: false,
        message: error.message || 'Unable to log in.',
        error: true,
      }))
    }
  }

  const handleAdminLogout = async () => {
    setAdminState((currentState) => ({
      ...currentState,
      actionLoading: true,
      message: '',
      error: false,
    }))

    try {
      await fetch('/api/newsletter/admin/logout', {
        method: 'POST',
        credentials: 'include',
      })

      setAdminState({
        authenticated: false,
        loading: false,
        actionLoading: false,
        message: 'Admin access closed.',
        error: false,
        summary: null,
      })
    } catch {
      setAdminState((currentState) => ({
        ...currentState,
        actionLoading: false,
        message: 'Unable to log out cleanly.',
        error: true,
      }))
    }
  }

  const handleSend = async () => {
    setAdminState((currentState) => ({
      ...currentState,
      actionLoading: true,
      message: '',
      error: false,
    }))

    try {
      const response = await fetch('/api/newsletter/admin/send', {
        method: 'POST',
        credentials: 'include',
      })
      const payload = await readApiPayload(response)

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to send the newsletter.')
      }

      await loadAdminSummary()
      setAdminState((currentState) => ({
        ...currentState,
        actionLoading: false,
        message: `Logged ${payload.recipientCount} subscribers for the next Gumbamail send.`,
        error: false,
      }))
    } catch (error) {
      setAdminState((currentState) => ({
        ...currentState,
        actionLoading: false,
        message: error.message || 'Unable to send the newsletter.',
        error: true,
      }))
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="admin-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-admin-title"
      >
        <div className="admin-modal-header">
          <div className="newsletter-panel-header">
            <ShieldCheck size={18} />
            <div>
              <p className="mono-label">Newsletter admin</p>
              <h2 id="newsletter-admin-title" className="admin-modal-title">
                Manual send console
              </h2>
            </div>
          </div>

          <button type="button" className="admin-close-button" onClick={onClose} aria-label="Close admin modal">
            <X size={16} />
          </button>
        </div>

        {adminState.authenticated ? (
          <div className="admin-modal-body">
            <div className="admin-summary-grid">
              <div className="info-block">
                <p className="mono-label">Subscribers</p>
                <p className="admin-metric">{adminState.summary?.subscriberCount ?? 0}</p>
              </div>
              <div className="info-block">
                <p className="mono-label">Current subject</p>
                <p>{adminState.summary?.emailSubject || currentEventFlyer.emailSubject}</p>
              </div>
            </div>

            <div className="info-block">
              <p className="mono-label">Subscriber sheet</p>
              <p>
                <a
                  href={adminState.summary?.sheetUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Google Sheet
                </a>
              </p>
            </div>

            <div className="newsletter-preview">
              <p className="mono-label">Current flyer that will be sent</p>
              <img
                src={currentEventFlyer.imagePath}
                alt={currentEventFlyer.imageAlt}
                className="newsletter-preview-image"
              />
            </div>

            <div className="info-block">
              <p className="mono-label">Last send</p>
              <p>
                {adminState.summary?.lastSend?.sentAt
                  ? new Date(adminState.summary.lastSend.sentAt).toLocaleString()
                  : 'No sends yet.'}
              </p>
            </div>

            <div className="info-block">
              <p className="mono-label">Send workflow</p>
              <p>
                This logs the campaign handoff here, then you send from Gumbamail
                using the Google Sheet list.
              </p>
            </div>

            {adminState.summary?.backendWarning ? (
              <p className="status-text error">{adminState.summary.backendWarning}</p>
            ) : null}

            <div className="admin-actions">
              <button
                type="button"
                className="primary-button"
                onClick={handleSend}
                disabled={adminState.actionLoading || adminState.loading}
              >
                {adminState.actionLoading ? 'Logging...' : 'Log Gumbamail send'}
                <Send size={16} />
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={handleAdminLogout}
                disabled={adminState.actionLoading}
              >
                Close admin
                <LogOut size={16} />
              </button>
            </div>
          </div>
        ) : (
          <form className="newsletter-form admin-login-form" onSubmit={handleAdminLogin}>
            <p className="newsletter-copy">
              Log in with the admin password, then manually trigger the current
              flyer workflow after the Events page image is live on Vercel.
            </p>
            <div className="newsletter-input-row">
              <input
                type="password"
                className="form-input"
                placeholder="Admin password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                required
              />
              <button type="submit" className="ghost-button" disabled={adminState.actionLoading || adminState.loading}>
                {adminState.actionLoading ? 'Checking...' : 'Admin login'}
                <LogIn size={16} />
              </button>
            </div>
          </form>
        )}

        {adminState.message ? (
          <p className={`status-text ${adminState.error ? 'error' : 'success'}`}>
            {adminState.message}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function NewsletterBlock() {
  const [email, setEmail] = useState('')
  const [subscribeState, setSubscribeState] = useState({ loading: false, message: '', error: false })

  const handleSubscribe = async (event) => {
    event.preventDefault()
    setSubscribeState({ loading: true, message: '', error: false })

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const payload = await readApiPayload(response)

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to subscribe right now.')
      }

      setEmail('')
      setSubscribeState({ loading: false, message: "Thanks. You're subscribed.", error: false })
    } catch (error) {
      setSubscribeState({
        loading: false,
        message: error.message || 'Unable to subscribe right now.',
        error: true,
      })
    }
  }

  return (
    <section className="section-panel newsletter-section">
      <div className="editorial-header">
        <p className="section-index">03</p>
        <div>
          <p className="mono-label">Newsletter</p>
          <h2 className="section-title">Do not miss meetup announcements.</h2>
        </div>
      </div>

      <div className="newsletter-public-grid">
        <div className="newsletter-panel newsletter-panel-primary">
          <div className="newsletter-panel-header">
            <Mail size={18} />
            <p className="mono-label">Email updates</p>
          </div>

          <p className="newsletter-copy newsletter-copy-large">
            Get meetup announcements, fresh flyer updates, and timing changes
            in your inbox before they slip past you on social.
          </p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-row">
              <input
                type="email"
                className="form-input"
                placeholder="Your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit" className="primary-button" disabled={subscribeState.loading}>
                {subscribeState.loading ? 'Saving...' : 'Subscribe'}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </form>

          {subscribeState.message ? (
            <p className={`status-text ${subscribeState.error ? 'error' : 'success'}`}>
              {subscribeState.message}
            </p>
          ) : null}
        </div>

        <div className="newsletter-benefits">
          <article className="newsletter-benefit-card">
            <p className="mono-label">01 / Meetup announcements</p>
            <p>Know when the next walk, meetup, or club event is posted.</p>
          </article>
          <article className="newsletter-benefit-card">
            <p className="mono-label">02 / Flyer updates</p>
            <p>See the most recent event flyer without having to go looking for it.</p>
          </article>
          <article className="newsletter-benefit-card">
            <p className="mono-label">03 / Timing changes</p>
            <p>Catch updates if details shift after the flyer goes live.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default NewsletterBlock
