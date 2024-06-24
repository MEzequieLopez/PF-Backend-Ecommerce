const { newPayment } = require("../handlers/stripeHandler");
const loginRequire = require("../middlewares/loginRequire");

const stripeRouter = require("express").Router();

stripeRouter
    .post("/stripeIntent", loginRequire, newPayment);
module.exports = stripeRouter;