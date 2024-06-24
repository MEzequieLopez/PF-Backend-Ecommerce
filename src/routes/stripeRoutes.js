const { newPayment, success, cancel } = require("../handlers/stripeHandler");
const loginRequire = require("../middlewares/loginRequire");

const stripeRouter = require("express").Router();

stripeRouter
    .post("/checkout-session", loginRequire, newPayment)
    .post("/checkout-success", loginRequire, success)
    .get("/checkout-cancel", loginRequire, cancel)
module.exports = stripeRouter;