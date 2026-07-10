export const EVENTS_PAGE_HASH = '#events'

export const currentEventFlyer = {
  imagePath: '/Images/bac july 2026.png',
  imageAlt: 'Boise Analog Club July 2026 flyer',
  emailSubject: 'Boise Analog Club / Latest update',
  emailHeadline: 'The newest Boise Analog Club flyer is live.',
  emailBody:
    'We just updated the current event flyer. You can view it below and head to the Events page for the latest club update.',
}

export function toAbsoluteUrl(siteUrl, path) {
  const normalizedBase = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`
  return new URL(path.startsWith('/') ? path.slice(1) : path, normalizedBase).toString()
}
