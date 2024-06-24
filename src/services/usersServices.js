const bcrypt = require('bcrypt');
const { User, Template } = require('../db');
const token = require('../utils/token');
const sendMail = require('../utils/nodemailer');


const registerService = async (email, lastname, name, userPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return { error: `El email ${email} ya existe`, status: 409 }
        }
        const newUser = await User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: hashedPassword,
        });
        await sendMail(email);
        return { data: `Bien venido a Vega, ${name}`, status: 201 }
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }
};

const loginService = async (email, userPassword) => {
    try {
        const user = await User.findOne({ where: { email } });
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(userPassword, user.password);

        if (!(user && passwordCorrect)) {
            return { status: 400, error: 'Email o contraseña inválidos.' };
        }

        const userToken = token(user);
        const { password, ...userWithoutPassword } = user.get();
        
        return { status: 200, data: { token: userToken, userInfo: userWithoutPassword} };

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { status: 500, error: 'Error al procesar la solicitud de login.' };
    }
};


const addNewFavorite = async (templateId, userId) => {
    try {
        const user = await User.findByPk(userId);
        const template = await Template.findByPk(templateId);
        if (user && template) {
            await user.addFavorite(template);
            return { status: 200, data: 'Favorito añadido.' };
        } else {
            return { status: 404, error: 'Usuario o Template no encontrado.' };
        }
    } catch (error) {
        console.error('Error al añadir a favoritos:', error);
        return { status: 500, error: 'Error al procesar la solicitud.' };
    }
};

const getAllFavorites = async (userId) => {

    try {
        const user = await User.findByPk(userId, {
            include: [ {
                model: Template,
                as: 'Favorites',
                through: {
                    attributes: []
                }
            } ]
        });

        if (!user) {
            return { status: 404, data: 'Usuario no encontrado' };
        }
        const favorites = user.Favorites;
        return { status: 200, data: favorites };
    } catch (error) {
        return { status: 500, error: error.message };
    }
};

const removeFavorite = async (templateId, userId) => {
    try {
        const user = await User.findByPk(userId);
        const template = await Template.findByPk(templateId);

        if (user && template) {
            await user.removeFavorite(template);
            return { status: 200, data: "Favorito eliminado." };
        } else {
            return { status: 404, error: 'Usuario o Template no encontrado.' };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, error: error.message };
    }
};


const getProfile = async (req, res) => {
    try {
      const userId = req.userId; 
  
      if (!userId) {
        return res.status(404).json({ message: 'Perfil no encontrado' });
      }
  
      
      const userProfileData = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] } 
      });
  
      if (!userProfileData) {
        return res.status(404).json({ message: 'Perfil no encontrado' });
      }
  
      
      res.status(200).json(userProfileData);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  const updateProfile = async (req, res) => {
    const {username, name, lastname, email } = req.body;
  
    try {
      const userId = req.userId;
  
      if (!userId) {
        return res.status(404).json({ message: 'Perfil no encontrado' });
      }
  
      
      await User.update(
        {
          username: username || req.user.username,
          name: name || req.user.name,
          lastname: lastname || req.user.lastname,
          email: email || req.user.email,
        },
        { where: { id: userId } }
      );
  
      
      const updatedProfile = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }
      });
  
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };  

  const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;
  
    try {
      const user = await User.findOne({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      await User.update(
        { password: hashedPassword },
        { where: { id: userId } }
      );
  
      res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  
module.exports = {
    registerService,
    loginService,
    addNewFavorite,
    getAllFavorites,
    removeFavorite,
    getProfile,
    updateProfile,
    changePassword
}