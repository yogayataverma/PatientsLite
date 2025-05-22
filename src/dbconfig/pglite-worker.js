import { PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';

worker({
  async init() {
    const db = new PGlite('idb://patients.db');
    await db.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id             serial PRIMARY KEY,
        firstname      text,
        lastname       text,
        dateofbirth    text,
        gender         text,
        email          text,
        phone          text,
        address        text,
        medicalhistory text,
        allergies      text
      );
    `);
    return db;
  },
});
