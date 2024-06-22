const jwt = require('jsonwebtoken')
const {SECRET} = process.env
//const isAuthenticated = require('./loginRequire');
const Admin = require('../models/Admin');
const router = require("express").Router();

// las rutas de admin utilizaran ambos middlewares
// asi isAdmin podra extraer info del jwt y utilizar para verificar los permisos en la tabla Admin.
module.exports = async (req, res, next) => {
    const user_id = req.user.user_id; // extraer de jwt.

    try {
        // buscar record en la tabla de Admin asociada al id de usuario.
        const isAdmin = await Admin.findOne({where: {user_id}})

        if (!isAdmin) {
            return res.status(403).json({notAdmin: 'no eres un admin'})
        };

        next();

    } catch (error) {
        return res.status(500).json({serverError: `Internal Server Error: ${error}`})
    }
};

