import { clearAdminSessionCookie } from '../../_lib/auth.js'
import { allowMethods, sendJson } from '../../_lib/http.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    allowMethods(res, ['POST'])
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  res.setHeader('Set-Cookie', clearAdminSessionCookie())
  return sendJson(res, 200, { success: true })
}
