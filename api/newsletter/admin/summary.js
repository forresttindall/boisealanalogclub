import { isAdminRequest } from '../../_lib/auth.js'
import { getSiteUrl, sendJson } from '../../_lib/http.js'
import { getLastNewsletterSend, getSubscriberCount } from '../../_lib/subscribers.js'
import { EVENTS_PAGE_HASH, currentEventFlyer, toAbsoluteUrl } from '../../../shared/eventFlyer.js'
import { newsletterSheet } from '../../../shared/newsletterSheet.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  if (!isAdminRequest(req)) {
    return sendJson(res, 401, { error: 'Unauthorized.' })
  }

  try {
    const siteUrl = getSiteUrl(req)
    let subscriberCount = 0
    let lastSend = null
    let backendWarning = null

    try {
      subscriberCount = await getSubscriberCount()
      lastSend = await getLastNewsletterSend()
    } catch (error) {
      backendWarning = error.message || 'Newsletter storage is not configured yet.'
    }

    return sendJson(res, 200, {
      success: true,
      subscriberCount,
      flyerImageUrl: toAbsoluteUrl(siteUrl, currentEventFlyer.imagePath),
      flyerImagePath: currentEventFlyer.imagePath,
      eventsPageUrl: `${siteUrl.replace(/\/$/, '')}/${EVENTS_PAGE_HASH}`,
      emailSubject: currentEventFlyer.emailSubject,
      sheetUrl: newsletterSheet.url,
      workflowType: 'gumbamail_google_sheets',
      lastSend,
      backendWarning,
    })
  } catch (error) {
    return sendJson(res, 500, { error: error.message || 'Unable to load the admin summary.' })
  }
}
