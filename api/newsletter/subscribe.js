import { allowMethods, parseJsonBody, sendJson } from '../_lib/http.js'
import { normalizeEmail, validateEmail } from '../_lib/crypto.js'
import { upsertSubscriber } from '../_lib/subscribers.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    allowMethods(res, ['POST'])
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  try {
    const { email } = await parseJsonBody(req)
    const normalizedEmail = normalizeEmail(email)

    if (!validateEmail(normalizedEmail)) {
      return sendJson(res, 400, { error: 'Please enter a valid email address.' })
    }

    await upsertSubscriber(normalizedEmail)

    return sendJson(res, 200, {
      success: true,
      message: 'You are subscribed to Boise Analog Club updates.',
    })
  } catch (error) {
    return sendJson(res, 500, {
      error: error.message || 'Unable to save this subscription right now.',
    })
  }
}
