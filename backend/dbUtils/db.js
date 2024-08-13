const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // Your PostgreSQL username
  host: 'localhost',     // Your database server
  database: 'postgres',// Your database name
  // password: 'adminHandlerPassword',// Your PostgreSQL password
  port: 5432,            // Default port for PostgreSQL
});

module.exports = pool;
