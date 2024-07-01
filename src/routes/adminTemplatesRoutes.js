const { getAllTemplates, deleteTemplate } = require("../services/adminTemplatesServices");
const loginRequire = require("../middlewares/loginRequire");

const adminTemplatesRouter = require("express").Router();

adminTemplatesRouter
.get("/", loginRequire, getAllTemplates)
.delete("/:id", loginRequire, deleteTemplate)

module.exports = adminTemplatesRouter;
