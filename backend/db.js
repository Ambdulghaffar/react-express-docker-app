const { Pool } = require('pg');

const pool = new Pool({
  user: 'user',
  host: 'db', // C'est le nom du service dans ton docker-compose.yml !
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

module.exports = pool;
