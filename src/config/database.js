const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis do .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Testa a conexão ao iniciar
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar no Postgres:', err.stack);
  }
  console.log('Conexão com o Postgres estabelecida com sucesso!');
  release();
});

module.exports = pool;