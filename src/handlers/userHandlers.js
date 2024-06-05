const { User } = require('../db');
const bcrypt = require('bcrypt');
const { registerService, loginService, addNewFavorite, getAllFavorites, removeFavorite } = require('../services/usersServices');

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

const addFavorite = async (req, res) => {
    const { templateId, userId } = req.body;
    try {
        const response = await addNewFavorite(templateId, userId);
        if (response.error) {
            return res.status(response.status).json(response.error);
        }
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(response.status).json(response.error);
    }
};

const getFavorites = async (req, res) => {
    const { userId } = req.params;
    try {
        const response = await getAllFavorites(userId);
        if (response.error) {
            return res.status(response.status).json(response.error);
        }
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(response.status).json(response.error);
    }
}

const deleteFavorite = async (req, res) => {
    const { userId, templateId } = req.params;

    try {
        const result = await removeFavorite(templateId, userId);
        return res.status(result.status).json(result.data);
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
}
module.exports = {
    registerUser,
    loginUser,
    addFavorite,
    getFavorites,
    deleteFavorite
}