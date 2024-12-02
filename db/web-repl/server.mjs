import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import cp from 'node:child_process';
import { promisify } from 'node:util';
import 'node:events';
import * as esbuild from 'esbuild';

(async () => {
  console.log('Booting...');

  const { stdout: sql } = await promisify(cp.execFile)(
    path.join(import.meta.dirname, '../../node_modules/.bin/tsx'),
    ['__tests__/__helpers__/dump-sql.ts'],
    { cwd: path.join(import.meta.dirname, '../..') },
  );

  const ctx = await esbuild.context({
    entryPoints: [path.join(import.meta.dirname, 'index.tsx')],
    bundle: true,
    outdir: 'dist',
    platform: 'browser',
    format: 'esm',
    sourcemap: 'inline',
    target: ['es2022'],
  });

  // TODO: ctx.serve()?
  // await ctx.watch();
  await ctx.rebuild();

  http
    .createServer(function (req, res) {
      switch (req.url) {
        case '/':
        case '/index.html':
          serveFile('index.html', res);
          break;

        case '/captured.sql':
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(sql);
          res.end();
          break;

        case '/dist/index.js':
        case '/dist/index.css':
          serveFile(req.url.slice(1), res);
          break;

        case '/release/postgres.wasm':
        case '/release/postgres.data':
          serveFile(`../../node_modules/@electric-sql/pglite${req.url}`, res);
          break;

        default:
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Not found');
          res.end();
          break;
      }
    })
    .listen(3001);

  console.log(`Listening on http://localhost:3001`);
})();

/**
 *
 * @param {string} name
 * @param {http.ServerResponse} res
 */
async function serveFile(name, res) {
  const file = await fs.readFile(path.join(import.meta.dirname, name));
  switch (path.extname(name)) {
    case '.html':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      break;
    case '.js':
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      break;
    case '.css':
      res.writeHead(200, { 'Content-Type': 'text/css' });
      break;
    case '.wasm':
      res.writeHead(200, { 'Content-Type': 'application/wasm' });
      break;
    default:
      res.writeHead(200);
      break;
  }
  res.write(file);
  res.end();
}
