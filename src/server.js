const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Configuração da conexão com o PostgreSQL usando as variáveis do .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// 2. Função para conectar e criar as tabelas automaticamente
const inicializarBanco = async () => {
  try {
    await pool.connect();
    console.log(' Conectado ao PostgreSQL com sucesso!');

    // Script SQL para criar as tabelas caso não existam
    const queryTabelas = `
      CREATE TABLE IF NOT EXISTS usuarios (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(queryTabelas);
    console.log(' Tabelas verificadas/criadas com sucesso!');
  } catch (err) {
    console.error(' Erro catastrófico ao conectar ou criar tabelas:', err.message);
  }
};

inicializarBanco();

// 3. Rotas direto no server.js (já que os arquivos estão na raiz)
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Inicialização do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando forte na porta ${PORT}`);
});