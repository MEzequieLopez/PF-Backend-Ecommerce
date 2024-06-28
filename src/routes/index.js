const templatesRouter = require("./templatesRoutes");
const userRouter = require("./userRoutes");
const reviewsRouter = require("./reviewsRoutes");
const stripeRouter = require("./stripeRoutes");
const cartRouter = require('./cartRouter');
const adminUserRouter = require('./adminUserRoutes');

const router = require("express").Router();

router
.use("/templates", templatesRouter)
.use("/user", userRouter)
.use("/reviews", reviewsRouter)
.use("/payment", stripeRouter)
.use('/cart', cartRouter)
.use('/admin/user', adminUserRouter) // para todas las tareas de admin relacionadas a CRUD de user.


module.exports= router;