const templatesRouter = require("./templatesRoutes");
const userRouter = require("./userRoutes");
const reviewsRouter = require("./reviewsRoutes");
const stripeRouter = require("./stripeRoutes");
const cartRouter = require("./cartRoutes");
const adminTemplatesRouter = require("./adminTemplatesRoutes"); 
const adminUserRouter = require('./adminUserRoutes');
const { adminTemplatesRouter } = require("./adminTemplatesRouter");

const router = require("express").Router();

router
.use("/templates", templatesRouter)
.use("/user", userRouter)
.use("/reviews", reviewsRouter)
.use("/payment", stripeRouter)
.use("/cart", cartRouter)


module.exports= router;