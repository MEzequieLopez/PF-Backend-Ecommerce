const { getTemplates, loadDb } = require("../handlers/templatesHandlers");
const templatesRouter = require("express").Router();

templatesRouter
    .get("/", getTemplates)
    .post("/loadDb", loadDb)

module.exports = templatesRouter;