const templatesRouter = require("./templatesRoutes");
const userRouter = require("./userRoutes");
const reviewsRouter = require("./reviewsRoutes");
const cartRouter = require('./cartRouter');

const router = require("express").Router();

router
.use("/templates", templatesRouter)
.use("/user", userRouter)
.use("/reviews", reviewsRouter)
.use('/cart', cartRouter) 

module.exports= router;