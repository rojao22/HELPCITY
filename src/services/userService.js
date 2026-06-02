const db = require('../config/database');

class UserService {
  // Buscar todos os usuários
  async getAllUsers() {
    const query = 'SELECT * FROM usuarios ORDER BY id ASC';
    const { rows } = await db.query(query);
    return rows;
  }

  // Criar um novo usuário
  async createUser(nome, email) {
    const query = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *';
    const values = [nome, email];
    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = new UserService();