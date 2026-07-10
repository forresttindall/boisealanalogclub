import { createAdminSessionCookie, verifyAdminPassword } from '../../_lib/auth.js'
import { allowMethods, parseJsonBody, sendJson } from '../../_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    allowMethods(res, ['POST'])
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  try {
    const { password } = await parseJsonBody(req)

    if (!verifyAdminPassword(password)) {
      return sendJson(res, 401, { error: 'Invalid admin password.' })
    }

    res.setHeader('Set-Cookie', createAdminSessionCookie())
    return sendJson(res, 200, { success: true })
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Unable to log in.' })
  }
}
