// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import * as Node from '@sentry/node';

const isDev = process.env.NODE_ENV === 'development';

Sentry.init({
  dsn: isDev ? undefined : process.env.NEXT_PUBLIC_SENTRY_DSN,

  spotlight: isDev,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  integrations: [Node.postgresIntegration()],
});
