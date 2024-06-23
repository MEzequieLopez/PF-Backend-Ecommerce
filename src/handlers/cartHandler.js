const { getFilteredTemplates, getTemplateId } = require("../services/templatesServices");
const data = require("../../Data.json");
const { Category, Technology, Template, Cart, Order } = require("../db");

// TODOS ESTAS RUTAS DEBEN UTILIZAR EL MIDDLEWARE DE AUTHENTICATION.

// el usuario podra interactuar con todas estas rutas simplemente haciendo click.

// agregar un template al carrito
const addItemToCart = async (req, res) => {
    const user_id = req.userId;
    const template_id = req.body.template_id;

    try {
        console.log({user_id, template_id});
        let cart = await Cart.findOne({ where: { user_id} });
        let template = await Template.findByPk(template_id);

        if (!cart) {
        // Crea un carrito nuevo, no es necesario almacenar template_id
            cart = await Cart.create({ user_id});
        }
    // Busca dentro de las ordenes la template que se añade por si ya la adquirio
        const orders = await Order.findAll({
            where: { user_id, status: ['complete', 'pending'] },
            include: [{
                model: Template,
                as: 'purchasedTemplates',
                where: { id: template_id }
            }]
        });

        if (orders.length) {
        // si encuentra que la plantilla esta dentro de las ordenes ya sea pagada o pendiente de pago
            return res.send({ message: "La plantilla ya ha sido adquirida o está en proceso de pago", data: orders[0].purchasedTemplates[0] });
        }

        const existingTemplate = await cart.getInCart({ where: { id: template_id } });
        if (existingTemplate.length) {
            const cartWithTemplates = await Cart.findByPk(cart.id, {
                include: [{
                    model: Template,
                    as: 'inCart',
                    through: {
                        attributes: []
                    }
                }]
            });
            return res.send({ message: "La plantilla ya está en el carrito", data: cartWithTemplates});
        }

        await cart.addInCart(template);

        const cartWithTemplates = await Cart.findByPk(cart.id, {
            include: [{
                model: Template,
                as: 'inCart',
                through: {
                    attributes: []
                }
            }]
        });

        const total = cartWithTemplates.inCart.reduce((acc, item) => acc + item.price, 0);
        cart.total_amount = parseFloat(total.toFixed(2));
        await cart.save();
        return res.send({ message: "Plantilla añadida al carrito", data: cartWithTemplates });
    } catch (error) {
        return res.status(500).json(`Internal Server Error: ${error}`);
    }
};




// limpiar todo el carrito
const clearCart = async () => {
    const user_id = req.userId

    try {

        const userCart = await Cart.findOne({ where: { user_id } });

        if (!userCart) {
            return res.status(404).json({ noCartFound: 'tu carrito ya esta limpio' })
        };

        // eliminar todos los templates del carrito
        await Cart.destroy({ where: { user_id } });

    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`)
    }
};

// eliminar un template especifico del carrito.
const deleteTemplateFromCart = async (req, res) => {
    const user_id = req.userId;
    const template_id = req.body.template_id;
    console.log(user_id);

    if (!template_id) {
        return res.status(400).json({ message: 'Debes incluir un template a eliminar' });
    }

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ where: { user_id } });

        if (!cart) {
            return res.status(404).json({ message: 'Aun no tienes nada en el carrito' });
        }

        // Check if the template exists in the cart
        const existingTemplate = await cart.getInCart({ where: { id: template_id } });

        if (!existingTemplate.length) {
            return res.status(404).json({ message: 'El template no existe en el carrito' });
        }

        // Remove the template from the cart
        await cart.removeInCart(existingTemplate[0]);

        // Recalculate the total amount in the cart
        const cartWithTemplates = await Cart.findByPk(cart.id, {
            include: [{
                model: Template,
                as: 'inCart',
                through: {
                    attributes: []
                }
            }]
        });

        const total = cartWithTemplates.inCart.reduce((acc, item) => acc + item.price, 0);
        cart.total_amount = parseFloat(total.toFixed(2));
        await cart.save();

        return res.send({ message: `Template con id: ${template_id} eliminado con éxito`, data: cartWithTemplates });
    } catch (error) {
        return res.status(500).json(`Internal Server Error: ${error}`);
    }
};


// ver el carrito del usuario.
const viewCart = async () => {

    try {

        const user_id = req.userId; // user_id estare en "req" gracias a los JWT
        const userCart = await Cart.findOne({ where: { user_id: user_id } });

        // si es que no hay cart entonces significa que 
        // el usuario aun no ha agregado ningun template a su carrito.
        if (!userCart) {
            // esta atributo en la respuesta se puede utilizar en el front 
            return res.status(404).json({ noCartFound: 'Aun no has agregado nada al carrito' })
        };

        res.json(userCart);

    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`)
    }
};


module.exports = {
    addItemToCart,
    clearCart,
    deleteTemplateFromCart

}

