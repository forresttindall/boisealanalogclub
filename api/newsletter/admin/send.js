import { isAdminRequest } from '../../_lib/auth.js'
import { getSiteUrl, sendJson } from '../../_lib/http.js'
import {
  getSubscriberCount,
  setLastNewsletterSend,
  toNewsletterStorageError,
} from '../../_lib/subscribers.js'
import { EVENTS_PAGE_HASH, currentEventFlyer, toAbsoluteUrl } from '../../../shared/eventFlyer.js'
import { newsletterSheet } from '../../../shared/newsletterSheet.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  if (!isAdminRequest(req)) {
    return sendJson(res, 401, { error: 'Unauthorized.' })
  }

  try {
    const siteUrl = getSiteUrl(req)
    const recipientCount = await getSubscriberCount()

    if (!recipientCount) {
      return sendJson(res, 400, { error: 'No subscribers have signed up yet.' })
    }

    const flyerImageUrl = toAbsoluteUrl(siteUrl, currentEventFlyer.imagePath)
    const eventsPageUrl = `${siteUrl.replace(/\/$/, '')}/${EVENTS_PAGE_HASH}`

    const metadata = {
      sentAt: new Date().toISOString(),
      recipientCount,
      flyerImagePath: currentEventFlyer.imagePath,
      subject: currentEventFlyer.emailSubject,
      notes: `Ready for Gumbamail. Import the Google Sheet, use the live flyer ${flyerImageUrl}, and link to ${eventsPageUrl}.`,
    }

    await setLastNewsletterSend(metadata)

    return sendJson(res, 200, {
      success: true,
      ...metadata,
      sheetUrl: newsletterSheet.url,
      flyerImageUrl,
      eventsPageUrl,
    })
  } catch (error) {
    const safeError = toNewsletterStorageError(error)

    return sendJson(res, 500, {
      error: safeError.message || 'Unable to send the newsletter right now.',
    })
  }
}
