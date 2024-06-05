const { getTemplates, loadDb, getTemplateById } = require("../handlers/templatesHandlers");
const templatesRouter = require("express").Router();

templatesRouter
    .get("/", getTemplates)
    .post("/loadDb", loadDb)
    .get('/:id', getTemplateById)

module.exports = templatesRouter;