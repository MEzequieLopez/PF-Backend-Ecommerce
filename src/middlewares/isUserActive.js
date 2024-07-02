const User = require('../models/User'); // Assuming your User model is imported

module.exports = async (req, res, next) => {
    const user_id = req.userId;

    if (!user_id) {
        return res.status(401).json({ error: 'Usuario no autorizado: ID de usuario no válido' });
    }

    try {
        const user = await User.findOne({ where: { id: user_id } });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (user.deleted_at) {
            return res.status(403).json({ error: 'Tu cuenta ha sido desactivada' });
        }

        
        return next();
    } catch (error) {
        console.error('Error in user authorization middleware:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
