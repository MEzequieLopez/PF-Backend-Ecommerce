const { newPayment } = require("../handlers/stripeHandler");
const loginRequire = require("../middlewares/loginRequire");

const stripeRouter = require("express").Router();

stripeRouter
    .post("/checkout-session", loginRequire, newPayment)
    .post("/checkout-success")
module.exports = stripeRouter;