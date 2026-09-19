# Deployment Guide

This document outlines the standard deployment procedures for Workforce ERP. The application supports both separated (two-tier) and unified (single-tier) deployment architectures.

## Prerequisites

1. **MongoDB Database**: Ensure a highly available MongoDB instance (e.g., MongoDB Atlas) is provisioned.
2. **Environment Variables**: Configure all required secrets. Never deploy using default or example `.env` values. Generate secure keys for authentication:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## Deployment Architectures

### Option A: Two-Tier Deployment (Recommended)
Host the frontend and backend as separate services.

**Backend Setup:**
1. Set the root directory to `server/`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Set required environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=<Database Connection String>`
   - `JWT_ACCESS_SECRET=<Secure Key>`
   - `JWT_REFRESH_SECRET=<Secure Key>`
   - `CLIENT_URL=<Frontend Production URL>`

**Frontend Setup:**
1. Set the root directory to `client/`.
2. Build command: `npm run build`
3. Configure routing to forward `/api/*` requests to the Backend URL.

### Option B: Single-Tier Deployment
Serve the frontend static files directly via the backend Express server.

1. Build the frontend assets:
   ```bash
   cd client && npm install && npm run build
   ```
2. Deploy the entire repository to your host.
3. Build command: `cd client && npm install && npm run build && cd ../server && npm install`
4. Start command: `cd server && npm start`
5. Configure the same environment variables as Option A (setting `CLIENT_URL` to the unified service URL).

## Post-Deployment Verification
After deployment, verify system health and core functionality:
- Verify `/health` endpoint returns a 200 status.
- Ensure secure communication (HTTPS) is active.
- Validate authentication flows and session persistence.
- Review system logs to confirm there are no startup warnings regarding insecure secrets.

## System Maintenance
- **Scheduled Tasks**: Configure cron jobs (e.g., daily attendance sweeps and task deadline reminders) to interact with the respective API endpoints.
- **Security Updates**: Regularly audit dependencies and ensure rate limits are tuned to expected organizational traffic.
