const { getAllTemplates, deleteTemplate } = require("../services/adminTemplatesServices");
const loginRequire = require("../middlewares/loginRequire");
const { postTemplates } = require("../handlers/templatesHandlers");

const adminTemplatesRouter = require("express").Router();

adminTemplatesRouter
.get("/", loginRequire, getAllTemplates)
.delete("/:id", loginRequire, deleteTemplate)
.post("/create", postTemplates)
module.exports = adminTemplatesRouter;
