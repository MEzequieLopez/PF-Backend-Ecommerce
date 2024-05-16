const { getTemplates } = require("../handlers/templatesHandlers");
const templatesRouter = require("express").Router();

templatesRouter.get("/", getTemplates)

module.exports = templatesRouter;