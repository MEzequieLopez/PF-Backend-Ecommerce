const templatesRouter = require("./templatesRoutes");
const userRouter = require("./userRoutes");

const router = require("express").Router();

router
.use("/templates", templatesRouter)
.use("/user", userRouter)

module.exports= router;