const bcrypt = require('bcrypt');
const { User } = require('../db');


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
            return { error: `El email ${email} ya existe`, status: 400 }
        }

        const newUser = await User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: hashedPassword,
        });

        const { password, ...userWithoutPassword } = newUser.get();
        return { data: userWithoutPassword, status: 201 }

    } catch (error) {
        console.error('Error al crear el usuario:', error);
    }
};

const loginService = async (email, userPassword) => {
    try {

        const user = await User.findOne({
            where: { email: email }
        });


        if (!user) {
            return { status: 404, data: 'Usuario no encontrado.' };
        }


        const isMatch = await bcrypt.compare(userPassword, user.password);

        if (isMatch) {
            const { password, ...userWithoutPassword } = user.get();
            return { status: 200, data: userWithoutPassword };
        } else {
            return { status: 404, error: 'Contraseña incorrecta.' };
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { status: 500, error: 'Error al procesar la solicitud de login.' };
    }
}

module.exports = {
    registerService,
    loginService
}