import { google } from 'googleapis'
import { normalizeEmail } from './crypto.js'
import { newsletterSheet } from '../../shared/newsletterSheet.js'

function getGoogleSheetsAuth() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY

  if (!clientEmail || !privateKey) {
    throw new Error(
      'Missing Google Sheets service account credentials. Set GOOGLE_SHEETS_CLIENT_EMAIL and GOOGLE_SHEETS_PRIVATE_KEY.'
    )
  }

  console.log('Attempting Google Sheets authentication...');
  console.log('Client Email:', clientEmail);
  // Log a portion of the private key to confirm it's being read, but redact most of it
  console.log('Private Key (partial):', privateKey.substring(0, 30) + '...');

  try {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (authError) {
    console.error('Error creating GoogleAuth client:', authError);
    throw new Error('Failed to authenticate with Google Sheets. Check credentials and environment. Original error: ' + authError.message);
  }
}

function getSheetsClient() {
  if (!globalThis.__bacSheetsClient) {
    globalThis.__bacSheetsClient = google.sheets({
      version: 'v4',
      auth: getGoogleSheetsAuth(),
    })
  }

  return globalThis.__bacSheetsClient
}

async function ensureSheetTab(title, headerRow) {
  const sheets = getSheetsClient()
  const spreadsheetId = newsletterSheet.spreadsheetId
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
  const existingTab = spreadsheet.data.sheets?.find(
    (sheet) => sheet.properties?.title === title
  )

  if (!existingTab) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: { title },
            },
          },
        ],
      },
    })
  }

  const headerRange = `${title}!A1:Z1`
  const existingHeader = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  })
  const hasHeader = (existingHeader.data.values?.[0] || []).length > 0

  if (!hasHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${title}!A1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [headerRow],
      },
    })
  }
}

async function getSubscriberRows() {
  await ensureSheetTab(newsletterSheet.subscribersTab, [
    'email',
    'source',
    'status',
    'subscribed_at',
  ])

  const sheets = getSheetsClient()
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: newsletterSheet.spreadsheetId,
    range: `${newsletterSheet.subscribersTab}!A2:D`,
  })

  return data.values || []
}

export async function upsertSubscriber(email) {
  const normalizedEmail = normalizeEmail(email)
  const sheets = getSheetsClient()
  const rows = await getSubscriberRows()
  const rowIndex = rows.findIndex(
    (row) => normalizeEmail(row[0]) === normalizedEmail
  )
  const now = new Date().toISOString()

  if (rowIndex >= 0) {
    const sheetRowNumber = rowIndex + 2

    await sheets.spreadsheets.values.update({
      spreadsheetId: newsletterSheet.spreadsheetId,
      range: `${newsletterSheet.subscribersTab}!A${sheetRowNumber}:D${sheetRowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[normalizedEmail, 'website', 'subscribed', now]],
      },
    })

    return {
      email: normalizedEmail,
      createdAt: rows[rowIndex][3] || now,
      updatedAt: now,
    }
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: newsletterSheet.spreadsheetId,
    range: `${newsletterSheet.subscribersTab}!A:D`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[normalizedEmail, 'website', 'subscribed', now]],
    },
  })

  return {
    email: normalizedEmail,
    createdAt: now,
    updatedAt: now,
  }
}

export async function listSubscriberEmails() {
  const rows = await getSubscriberRows()

  return rows
    .map((row) => normalizeEmail(row[0]))
    .filter(Boolean)
}

export async function getSubscriberCount() {
  const rows = await getSubscriberRows()
  return rows.filter((row) => normalizeEmail(row[0])).length
}

export async function setLastNewsletterSend(metadata) {
  await ensureSheetTab(newsletterSheet.sendLogTab, [
    'sent_at',
    'recipient_count',
    'flyer_image_path',
    'subject',
    'notes',
  ])

  await getSheetsClient().spreadsheets.values.append({
    spreadsheetId: newsletterSheet.spreadsheetId,
    range: `${newsletterSheet.sendLogTab}!A:E`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          metadata.sentAt,
          String(metadata.recipientCount),
          metadata.flyerImagePath,
          metadata.subject,
          metadata.notes || '',
        ],
      ],
    },
  })
}

export async function getLastNewsletterSend() {
  await ensureSheetTab(newsletterSheet.sendLogTab, [
    'sent_at',
    'recipient_count',
    'flyer_image_path',
    'subject',
    'notes',
  ])

  const { data } = await getSheetsClient().spreadsheets.values.get({
    spreadsheetId: newsletterSheet.spreadsheetId,
    range: `${newsletterSheet.sendLogTab}!A2:E`,
  })
  const rows = data.values || []

  if (!rows.length) {
    return null
  }

  const lastRow = rows[rows.length - 1]

  return {
    sentAt: lastRow[0] || null,
    recipientCount: Number(lastRow[1] || 0),
    flyerImagePath: lastRow[2] || null,
    subject: lastRow[3] || null,
    notes: lastRow[4] || null,
  }
}
