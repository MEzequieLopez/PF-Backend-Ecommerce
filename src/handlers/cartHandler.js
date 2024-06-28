const { getFilteredTemplates, getTemplateId } = require("../services/templatesServices");
const data = require("../../Data.json");
const { Category, Technology, Template, Cart } = require("../db");

// TODOS ESTAS RUTAS DEBEN UTILIZAR EL MIDDLEWARE DE AUTHENTICATION.

// el usuario podra interactuar con todas estas rutas simplemente haciendo click.

// agregar un template al carrito
const addItemToCart = async (req, res) => {
    const user_id = req.userId; // extract userId from JWT
    const template_id = req.body.template_id;

    if (!template_id) {
        return res.status(400).json({ missingTemplate: 'Debes incluir un template' });
    }

    try {
        
        const checkTemplateInCart = await Cart.findOne({ where: { user_id, template_id } });
        if (checkTemplateInCart) {
            return res.status(400).json(`Template id: ${template_id} ya está en el carrito`);
        }

        
        await Cart.create({ user_id, template_id });
        return res.json(`Producto agregado`);

    } catch (error) {
        return res.status(500).json(`Internal Server Error: ${error}`);
    }
};


// limpiar todo el carrito
const clearCart = async (req, res) => {
    const user_id = req.userId;

    try {
        
        const userCart = await Cart.findOne({where: {user_id}});

        if (!userCart) {
            return res.status(404).json({noCartFound: 'tu carrito ya esta limpio'})
        };

        // eliminar todos los templates del carrito
        await Cart.destroy({where: {user_id}});
        return res.json({cartCleared: 'carrito ha sido limpiado'})

    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`)
    }
};

// eliminar un template especifico del carrito.
const deleteTemplateFromCart = async (req, res) => {
    const user_id = req.userId;
    const template_id = req.body.template_id;

    if (!template_id) {
        return res.status(400).json({ missingTemplate: 'Debes incluir un template a eliminar' });
    };

    try {
        // encontrar cart del usuario (esto tambien verifica si tiene algo agregado)
        const cart = await Cart.findOne({ where: { user_id, template_id } });

        if (!cart) {
            return res.status(404).json({ cartNotFound: 'Aun no tienes este template en el carrito' });
        };

        // eliminar el producto del carrito
        await Cart.destroy({ where: { user_id, template_id } });

        res.json({ message: `Template con id: ${template_id} eliminado con exito` });

    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`);
    }
};


// ver el carrito del usuario.
const viewCart = async (req, res) => {

    try {
    const user_id = req.userId; // user_id estare en "req" gracias a los JWT
    const userCart = await Cart.findAll({where: {user_id: user_id}});

    // si es que no hay cart entonces significa que 
    // el usuario aun no ha agregado ningun template a su carrito.
    if (userCart.length === 0) {
        // esta atributo en la respuesta se puede utilizar en el front 
        return res.status(404).json({noCartFound: 'Aun no has agregado nada al carrito'})
    };

    res.json(userCart);

    } catch (error) {
        if (error instanceof SequelizeDatabaseError && error.message.includes('invalid input syntax for type uuid')) {
            return res.status(400).json({ error: 'El ID del template es inválido' });
        }

        res.status(500).json(`Internal Server Error: ${error}`);
    }
};


module.exports = {
    addItemToCart,
    clearCart,
    deleteTemplateFromCart,
    viewCart

}

