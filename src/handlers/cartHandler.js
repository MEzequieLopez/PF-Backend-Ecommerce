const { getFilteredTemplates, getTemplateId } = require("../services/templatesServices");
const data = require("../../Data.json");
const { Category, Technology, Template, Cart } = require("../db");

// TODOS ESTAS RUTAS DEBEN UTILIZAR EL MIDDLEWARE DE AUTHENTICATION.

// el usuario podra interactuar con todas estas rutas simplemente haciendo click.

// agregar un template al carrito
const addItemToCart = async () => {
    const user_id = req.user.user_id; // extraer userId del JWT.
    const template_id = req.body.template_id;

    try {

        let cart = await Cart.findOne({where: {user_id}});

        // si es que no hay carrito significa que el usuario aun no habia agregado nada.
        // entonces crearlo rapidamente.

        if (!cart) {
            await Cart.create({user_id, template_id})
        }
        
        // revisar si el template ya se encuentra en el carrito.
        const checkTemplateInCart = await Cart.findOne({where: {user_id, template_id}});
        if (checkTemplateInCart) {

            return res.status(400).json(`Template id: ${template_id} ya esta en el carrito`)

        } else {
            await Cart.create({template_id});
            // si es que el usuario ya tiene un carrito entonces
            // simplemente agregar el template.
        }

    } catch (error) {
        return res.status(500).json(`Internal Server Error: ${error}`)
    }
};

// limpiar todo el carrito
const clearCart = async () => {
    const user_id = req.user.user_id;

    try {
        
        const userCart = await Cart.findOne({where: {user_id}});

        if (!userCart) {
            return res.status(404).json({noCartFound: 'tu carrito ya esta limpio'})
        };

        // eliminar todos los templates del carrito
        await Cart.destroy({where: {user_id}});

    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`)
    }
};

// eliminar un template especifico del carrito.
const deleteTemplateFromCart = async () => {
    const user_id = req.user.user_id;
    const template_id = req.body.template_id;

    if (!template_id) {
        return res.status(400).json({missingTemplate: 'Debes incluir un template a eliminar'});
    };

    try {
        
        // encontrar cart del usuario (esto tambien verifica si tiene algo agregado)
        const cart = await Cart.findOne({where: user_id});

        if (!cart) {
            return res.status(404).json({cartNotFound: 'Aun no tienes nada en el carrito'})
        };
        // automaticamente apenas agreguen algo al carrito, se creara una entrada
        // asociada a ese usuario.

        const templateToDelete = await Cart.findOne({where: {template_id: template_id}});

        if (!templateToDelete) {
            return res.status(404).json({templateNotFound: 'El template no existe'})
        };

        await Cart.destroy({where: {template_id: template_id}});

        res.json({message: `Template con id: ${template_id} eliminado con exito`})

    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`);
    }
};

// ver el carrito del usuario.
const viewCart = async () => {

    try {
        
    const user_id = req.user.user_id; // user_id estare en "req" gracias a los JWT
    const userCart = await Cart.findOne({where: {user_id: user_id}});

    // si es que no hay cart entonces significa que 
    // el usuario aun no ha agregado ningun template a su carrito.
    if (!userCart) {
        // esta atributo en la respuesta se puede utilizar en el front 
        return res.status(404).json({noCartFound: 'Aun no has agregado nada al carrito'})
    };

    res.json(userCart);

    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`)
    }
};


module.exports = {
    addItemToCart,
    clearCart,

}

