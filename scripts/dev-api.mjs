import 'dotenv/config'
import http from 'node:http'
import subscribeHandler from '../api/newsletter/subscribe.js'
import adminLoginHandler from '../api/newsletter/admin/login.js'
import adminLogoutHandler from '../api/newsletter/admin/logout.js'
import adminSummaryHandler from '../api/newsletter/admin/summary.js'
import adminSendHandler from '../api/newsletter/admin/send.js'

const PORT = Number(process.env.LOCAL_API_PORT || 43211)

const routes = {
  '/api/newsletter/subscribe': subscribeHandler,
  '/api/newsletter/admin/login': adminLoginHandler,
  '/api/newsletter/admin/logout': adminLogoutHandler,
  '/api/newsletter/admin/summary': adminSummaryHandler,
  '/api/newsletter/admin/send': adminSendHandler,
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`)
  const handler = routes[requestUrl.pathname]

  if (!handler) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'API route not found.' }))
    return
  }

  try {
    await handler(req, res)
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(
      JSON.stringify({
        error: error.message || 'Local API server error.',
      })
    )
  }
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `newsletter local api could not start because port ${PORT} is already in use. Stop the stale process on that port, then restart npm run dev.`
    )
    process.exit(1)
  }

  throw error
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`newsletter local api ready at http://127.0.0.1:${PORT}`)
})
