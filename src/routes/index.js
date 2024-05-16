const templatesRouter = require("./templatesRoutes");

const router = require("express").Router();

router.use("/templates", templatesRouter)

module.exports= router;