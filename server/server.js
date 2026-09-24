import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { startScheduler } from './scheduler.js';

const start = async () => {
  await connectDB();
  startScheduler();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${env.port} [${env.nodeEnv}]`);
  });
};

start();
