const templatesRouter = require("./templatesRoutes");
const userRouter = require("./userRoutes");
const reviewsRouter = require("./reviewsRoutes");

const router = require("express").Router();

router
.use("/templates", templatesRouter)
.use("/user", userRouter)
.use("/reviews", reviewsRouter)


module.exports= router;