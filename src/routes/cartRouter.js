const cartRouter = require("express").Router();
const { viewCart, clearCart, addItemToCart, deleteTemplateFromCart } = require('../handlers/cartHandler');
const isAuthenticated = require('../middlewares/loginRequire');
const isAdmin = require('../middlewares/isAdmin'); 

cartRouter.use(isAuthenticated);

cartRouter
    .get('/viewcart', viewCart)
    .post('/additem', addItemToCart)
    .delete('/deleteitem', deleteTemplateFromCart)
    .delete('/clearcart', clearCart);

module.exports = cartRouter;
