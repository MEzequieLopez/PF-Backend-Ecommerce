const { newPayment, success, cancel } = require("../handlers/stripeHandler");
const loginRequire = require("../middlewares/loginRequire");

const stripeRouter = require("express").Router();

stripeRouter
    .post("/checkout-session", loginRequire, newPayment)
    .get("/checkout-success", success)
    .get("/checkout-cancel", cancel)
module.exports = stripeRouter;