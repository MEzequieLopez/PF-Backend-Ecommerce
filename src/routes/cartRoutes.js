const { addItemToCart, deleteTemplateFromCart } = require("../handlers/cartHandler");
const loginRequire = require("../middlewares/loginRequire");

const cartRouter = require("express").Router();

cartRouter
    .post("/addCart",loginRequire, addItemToCart)
    .post("/deleteCart", loginRequire, deleteTemplateFromCart)


module.exports = cartRouter;