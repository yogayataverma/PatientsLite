import { PGliteWorker } from '@electric-sql/pglite/worker';
import { live } from '@electric-sql/pglite/live';

const db = new PGliteWorker(
  new Worker(new URL('./pglite-worker.js', import.meta.url), { type: 'module' }),
  { extensions: { live } }
);

export default db;
