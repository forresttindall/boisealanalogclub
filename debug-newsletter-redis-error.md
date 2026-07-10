# Debug Session: newsletter-redis-error
- **Status**: [OPEN]
- **Issue**: Newsletter subscribe form still shows a Redis environment error even though the backend was migrated to Google Sheets and Gumbamail.
- **Debug Server**: pending
- **Log File**: .dbg/trae-debug-log-newsletter-redis-error.ndjson

## Reproduction Steps
1. Start the local newsletter API and Vite dev server.
2. Submit the newsletter form from the homepage.
3. Observe the response message surfaced by the subscribe form.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | The frontend is reaching a stale local or deployed API instance that still contains Redis-era code. | High | Low | Pending |
| B | One remaining newsletter route or helper still references Redis and is being loaded at runtime. | High | Low | Pending |
| C | The Vite proxy or local API server is routing `/api` traffic to the wrong target. | Medium | Low | Pending |
| D | The Sheets code is failing, but the UI is showing a stale cached message from a previous handler. | Medium | Medium | Pending |

## Log Evidence
- `curl -X POST http://127.0.0.1:43211/api/newsletter/subscribe` initially returned `{"error":"Missing Upstash Redis environment variables."}` while `rg` found no Redis code in the current repo.
- `lsof -nP -iTCP:43211 -sTCP:LISTEN` showed an already-running `node scripts/dev-api.mjs` process on that port.
- After killing the stale process and starting the current local API, the same subscribe request returned `{"error":"Missing Google Sheets service account credentials. Set GOOGLE_SHEETS_CLIENT_EMAIL and GOOGLE_SHEETS_PRIVATE_KEY."}`.

## Verification Conclusion
Hypothesis A confirmed: the form was reaching a stale in-memory local API process that still contained the Redis implementation.
Hypothesis B rejected for the current source tree: no Redis string remains in the repo.
Current runtime now points at the Google Sheets implementation. Remaining setup blocker is missing Google Sheets service account env vars.
