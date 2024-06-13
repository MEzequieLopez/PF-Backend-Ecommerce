const { getTemplates, loadDb, getTemplateById, getTechnologies, getCategories } = require("../handlers/templatesHandlers");
const templatesRouter = require("express").Router();

templatesRouter
    .get("/", getTemplates)
    .post("/loadDb", loadDb)
    .get("/technologies", getTechnologies)
    .get("/categories", getCategories)
    .get('/:id', getTemplateById)
module.exports = templatesRouter;