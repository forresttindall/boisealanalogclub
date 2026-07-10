# Boise Analog Club Newsletter Setup

This version uses:

- Google Sheets to store subscriber emails
- Gumbamail to send the actual campaign from Gmail
- the site admin modal only to log the campaign handoff and review counts

## What the site does

- saves newsletter signups into your Google Sheet
- shows subscriber count in the admin modal
- logs each manual campaign handoff into a `SendLog` tab

## What Gumbamail does

- imports the subscriber list from your Google Sheet inside Gmail
- sends the actual newsletter campaign

## Sheet in use

The app is already pointed at this sheet:

- [`Boise Analog Club subscriber sheet`](https://docs.google.com/spreadsheets/d/1k52qPSjfZdKE8IH6Sks00WUGYBYmVLdDPOzH2vlwYw8/edit?usp=sharing)

The code will use or create these tabs:

- `Subscribers`
- `SendLog`

## Required local env vars

Add these to [`.env`](file:///Users/forresttindall/Documents/Code%20Local/boiseanalogclub/.env):

```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

NEWSLETTER_ADMIN_PASSWORD=RiverBear1!
ADMIN_SESSION_SECRET=your-random-hex-string
SITE_URL=http://localhost:43210
LOCAL_API_PORT=43211
```

## Required Vercel env vars

Add these in Vercel Project Settings -> Environment Variables:

```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NEWSLETTER_ADMIN_PASSWORD=RiverBear1!
ADMIN_SESSION_SECRET=your-random-hex-string
SITE_URL=https://your-live-domain.com
```

## Google Sheets service account setup

1. Open Google Cloud Console.
2. Create a project or use an existing one.
3. Enable the `Google Sheets API`.
4. Create a `Service Account`.
5. Create a JSON key for that service account.
6. From the JSON file, copy:
   - `client_email` -> `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `private_key` -> `GOOGLE_SHEETS_PRIVATE_KEY`

## Share the sheet with the service account

This is the step people usually miss.

Open your sheet and click `Share`.

Add the service account email from `GOOGLE_SHEETS_CLIENT_EMAIL` as an `Editor`.

Without that, the website cannot append new subscriber rows.

## Local test flow

1. save the env vars
2. restart dev

```bash
npm run dev
```

3. subscribe with a test email on the site
4. open the Google Sheet
5. confirm a row appears in the `Subscribers` tab
6. open the footer `newsletter admin` link
7. log in with `RiverBear1!`

## Production setup

1. add the Google Sheets service account env vars in Vercel
2. add the admin/env secrets in Vercel
3. set `SITE_URL` to your production domain
4. redeploy the site

## Gumbamail send workflow

After the flyer is updated and the site is live:

1. open Gmail with your Gumbamail-enabled account
2. open Gumbamail
3. create or update a recipient list by importing from Google Sheets
4. choose this sheet and the `Subscribers` tab
5. build the campaign in Gumbamail
6. use the live flyer image and link to the live Events page
7. send the campaign from Gumbamail
8. optionally open the website admin modal and click `Log Gumbamail send` to record that handoff in `SendLog`

## Notes

- the site no longer uses Supabase
- the site no longer sends the campaign itself
- Gumbamail is the sending tool now
- Google Sheets is the source of truth for subscribers
