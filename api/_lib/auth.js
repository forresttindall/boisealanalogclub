import crypto from 'node:crypto'

const SESSION_COOKIE_NAME = 'bac_admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

function getCookieSecurityDirectives() {
  return process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
}

function getAdminPassword() {
  const password = process.env.NEWSLETTER_ADMIN_PASSWORD

  if (!password) {
    throw new Error('Missing NEWSLETTER_ADMIN_PASSWORD environment variable.')
  }

  return password
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret) {
    throw new Error('Missing ADMIN_SESSION_SECRET environment variable.')
  }

  return secret
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url')
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8')
}

function signValue(value) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('base64url')
}

function constantTimeCompare(a, b) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer)
}

export function verifyAdminPassword(candidatePassword) {
  return constantTimeCompare(String(candidatePassword || ''), getAdminPassword())
}

export function createAdminSessionCookie() {
  const payload = base64UrlEncode(
    JSON.stringify({
      role: 'newsletter_admin',
      exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    })
  )
  const signature = signValue(payload)
  const token = `${payload}.${signature}`

  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; ${getCookieSecurityDirectives()}SameSite=Strict; Max-Age=${SESSION_MAX_AGE_SECONDS}`
}

export function clearAdminSessionCookie() {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; ${getCookieSecurityDirectives()}SameSite=Strict; Max-Age=0`
}

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((cookies, part) => {
    const [name, ...rest] = part.trim().split('=')

    if (!name) {
      return cookies
    }

    cookies[name] = rest.join('=')
    return cookies
  }, {})
}

export function isAdminRequest(req) {
  const cookies = parseCookies(req.headers.cookie || '')
  const token = cookies[SESSION_COOKIE_NAME]

  if (!token) {
    return false
  }

  const [payload, signature] = token.split('.')

  if (!payload || !signature || !constantTimeCompare(signValue(payload), signature)) {
    return false
  }

  try {
    const parsedPayload = JSON.parse(base64UrlDecode(payload))
    return parsedPayload.role === 'newsletter_admin' && parsedPayload.exp > Date.now()
  } catch {
    return false
  }
}
