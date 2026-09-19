import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// If deployed behind a reverse proxy (Render, Railway, Heroku, Nginx,
// etc.) - required for express-rate-limit to see the real client IP
// instead of the proxy's, and for secure cookies to be set correctly.
if (env.nodeEnv === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true, // required so the httpOnly refresh-token cookie is sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Strips any request key starting with "$" or containing "." from
// body/params/query - defense-in-depth against NoSQL/operator-injection
// attempts (e.g. a login payload of { email: { "$gt": "" } }). Mongoose's
// own schema typing already blocks most of this, but this is a cheap,
// standard extra layer.
app.use(mongoSanitize());

// General API-wide safety net, separate from the stricter login-specific
// limiter in auth.routes.js. Generous on purpose - this exists to blunt
// abuse/scraping, not to rate-limit normal usage.
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please slow down' },
  })
);

if (env.nodeEnv !== 'test') {
  app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'));
}

app.get('/health', (req, res) => res.json({ status: 'ok', env: env.nodeEnv }));

app.use('/api', apiRoutes);

// Optional single-service deployment: if a built frontend exists at
// client/dist (i.e. `npm run build` was run in client/ and the folder was
// deployed alongside the server), serve it as static files and fall back
// to index.html for any non-API route so React Router's client-side
// routing works on a hard refresh. If client/dist doesn't exist (e.g. the
// frontend is deployed separately to Vercel/Netlify), this is skipped
// entirely and only the API is served - see DEPLOYMENT.md for both options.
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (env.nodeEnv === 'production' && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
