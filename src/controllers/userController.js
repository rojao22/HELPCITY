const userService = require('../services/userService');

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários: ' + error.message });
    }
  }

  async createUser(req, res) {
    const { nome, email } = req.body;
    try {
      const newUser = await userService.createUser(nome, email);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário: ' + error.message });
    }
  }
}

module.exports = new UserController();