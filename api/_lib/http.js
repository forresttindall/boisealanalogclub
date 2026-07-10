export async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  const chunks = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  if (chunks.length === 0) {
    return {}
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  return rawBody ? JSON.parse(rawBody) : {}
}

export function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

export function allowMethods(res, methods) {
  res.setHeader('Allow', methods.join(', '))
}

export function getSiteUrl(req) {
  const requestOrigin = req?.headers?.origin
  const forwardedProto = req?.headers?.['x-forwarded-proto']
  const forwardedHost = req?.headers?.['x-forwarded-host']
  const host = req?.headers?.host
  const explicitSiteUrl = process.env.SITE_URL
  const projectDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const previewDomain = process.env.VERCEL_URL

  if (requestOrigin) {
    return requestOrigin
  }

  if (forwardedHost) {
    const protocol = forwardedProto || 'https'
    return `${protocol}://${forwardedHost}`
  }

  if (host) {
    const protocol = host.includes('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https'
    return `${protocol}://${host}`
  }

  const rawUrl = explicitSiteUrl || projectDomain || previewDomain

  if (!rawUrl) {
    throw new Error('Missing SITE_URL or Vercel deployment URL environment variable.')
  }

  return rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`
}
