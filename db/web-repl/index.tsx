import * as React from 'react';
import * as Client from 'react-dom/client';
import { PGlite } from '@electric-sql/pglite';
import { Repl } from '@electric-sql/pglite-repl';

(async () => {
  const pg = new PGlite();
  const resp = await fetch('/captured.sql');
  for (const { text, values } of (await resp.json()) as any) {
    await pg.query(text, values);
  }
  Client.createRoot(document.getElementById('root')).render(<Repl pg={pg} />);
})();
