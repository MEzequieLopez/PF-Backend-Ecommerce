const { addItemToCart } = require("../handlers/cartHandler");
const loginRequire = require("../middlewares/loginRequire");

const cartRouter = require("express").Router();

cartRouter
    .post("/addCart",loginRequire, addItemToCart)


module.exports = cartRouter;