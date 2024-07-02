const { getTemplates, loadDb, getTemplateById, getTechnologies, getCategories} = require("../handlers/templatesHandlers");
const { searchTemplateByTechnology,} = require("../services/templatesServices");

const templatesRouter = require("express").Router();

templatesRouter
    .get("/", getTemplates)
    .post("/loadDb", loadDb)
    .get("/technologies", getTechnologies)
    .get("/categories", getCategories)
    .get('/:id', getTemplateById)
    .get('/search/technology', searchTemplateByTechnology)

module.exports = templatesRouter;
