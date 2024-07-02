
const { postTemplates } = require("../handlers/templatesHandlers");
const loginRequire = require("../middlewares/loginRequire");

const adminTemplatesRouter = require("express").Router();

adminTemplatesRouter
.post("/create", postTemplates)

module.exports = {adminTemplatesRouter}