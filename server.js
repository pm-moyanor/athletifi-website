/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const Sentry = require('@sentry/nextjs');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    // Attempt to differentiate between a fresh page load and assets such as
    // CSS, JS, images, etc.
    //
    //   - If the request has no referrer, it's a fresh page load.
    //   - If accept does not contain text/html, it is *not* a page load.
    //   - If the sentry-trace cookie is missing, we can't do anything.
    const accept = parseAccept(req);
    const cookies = parseCookies(req);
    if (
      req.headers.referer &&
      !('text/html' in accept) &&
      'sentry-trace' in cookies
    ) {
      // If this request is (probably) an asset, attach it to the parent trace.
      await Sentry.continueTrace(
        { sentryTrace: cookies['sentry-trace'], baggage: cookies.baggage },
        async () => {
          await Sentry.startSpan({ name: `GET ${req.url}` }, async () => {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
          });
        },
      );
    } else {
      // If this request is a fresh page load or there is no sentry-trace
      // cookie, create a new span and add the sentry-trace cookie.
      await Sentry.startNewTrace(async () => {
        await Sentry.startSpan({ name: `GET ${req.url}` }, async (span) => {
          const trace = Sentry.spanToTraceHeader(span);
          const baggage = Sentry.spanToBaggageHeader(span);
          res.setHeader('set-cookie', [
            `sentry-trace=${trace}`,
            `baggage=${baggage}`,
          ]);

          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        });
      });
    }
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  );
});

/**
 * Parse the Accept header.
 * @param {import('http').IncomingMessage} req - the request.
 * @returns {Record<string, number>} accepted mime types and their Q value.
 */
function parseAccept(req) {
  if (!req.headers.accept) {
    return {};
  }

  const accept = {};
  for (const s of req.headers.accept.split(',')) {
    const [h, q] = s.split(';');
    if (q) {
      accept[h.trim()] = Number(q.split('=')[1]);
    } else {
      accept[h.trim()] = 1;
    }
  }
  return accept;
}

/**
 * Parse the Cookie header.
 * @param {import('http').IncomingMessage} req - the request.
 * @returns {Record<string, string>} cookies.
 */
function parseCookies(req) {
  if (!req.headers.cookie) {
    return {};
  }

  const cookies = {};
  for (const s of req.headers.cookie.split(';')) {
    const [name, value] = s.split('=', 2);
    if (name && value) {
      cookies[name.trim()] = value.trim();
    }
  }
  return cookies;
}
