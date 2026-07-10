export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
