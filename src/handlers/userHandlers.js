const { User } = require('../db');
const bcrypt = require('bcrypt');
const { registerService, loginService } = require('../services/usersServices');

const registerUser = async (req, res) => {
    const { email, lastname, name } = req.body;
    const userPassword = req.body.password;
    try {
        const response = await registerService(email, lastname, name, userPassword);
        if (response.error) {
            return res.status(response.status).json(response.error);
        }
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.json(error);
    }
};

const loginUser = async (req, res) => {
    const { email } = req.body;
    const userPassword = req.body.password;

    try {

        const response = await loginService(email, userPassword);
        if (response.error) {
            return res.status(response.status).json(response.error);
        }
        return res.status(response.status).json(response.data);

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(response.status).json(response.error);
    }
};

module.exports = {
    registerUser,
    loginUser
}