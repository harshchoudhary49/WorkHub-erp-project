// Runs before any test file's imports resolve (see vitest.config.js's
// `setupFiles`). Every module we unit test eventually imports
// config/env.js, which exits the process if required env vars are
// missing - these unit tests are pure logic and never touch a real
// database, so fake-but-valid values are enough to satisfy that check
// without needing a real .env file in CI or on a fresh checkout.
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/workforce_erp_test';
process.env.JWT_ACCESS_SECRET = 'test_access_secret_not_for_real_use_0001';
process.env.JWT_REFRESH_SECRET = 'test_refresh_secret_not_for_real_use_0001';
