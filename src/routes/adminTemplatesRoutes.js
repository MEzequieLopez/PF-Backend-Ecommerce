const { getAllTemplates, deleteTemplate } = require("../services/adminTemplatesServices");
const loginRequire = require("../middlewares/loginRequire");
const { postTemplates } = require("../handlers/templatesHandlers");

const adminTemplatesRouter = require("express").Router();

adminTemplatesRouter
.get("/", getAllTemplates)
.delete("/:id", deleteTemplate)
.post("/create", postTemplates)
module.exports = adminTemplatesRouter;
