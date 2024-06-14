const { getFilteredTemplates, getTemplateId, getAllTechnologies, getAllCategories } = require("../services/templatesServices");
const data = require("../../Data.json");
const { Category, Technology, Template } = require("../db");

const getTemplates = async (req, res) => {
    const { technology, category, sortBy, order, page, pageSize } = req.query;
    try {
        const templates = await getFilteredTemplates({
            technology,
            category,
            sortBy,
            order,
            page,
            pageSize
        });
        if (templates.status === 404) {
            return res.status(templates.status).json(templates.error);
        }
        
        return res.status(templates.status).send(templates);
    } catch (error) {
        console.error(error);
        return res.json(error);
    }
}

const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getTemplateId(id)

        if (!response || Object.keys(data).length === 0) {
            return res.status(400).send('No encontrado')
        }

        res.status(200).json(response)

    } catch (error) {
        console.error(error);
        res.status(500).send('Ha ocurrido un error.');
    }
}

const getTechnologies = async (req, res) => {
    try {
        const response = await getAllTechnologies();
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).send('Ha ocurrido un error.');
    }
}

const getCategories = async (req, res) => {
    try {
        const response = await getAllCategories()
        return res.status(200).json(response)

    } catch (error) {
        res.status(500).send('Ha ocurrido un error.');
    }
}
// funcion auxiliar par cargar la base de datos
const loadDb = async (req, res) => {
    try {

        const categories = await Category.bulkCreate(data.categories);


        const technologies = await Technology.bulkCreate(data.technologies);


        for (const templateData of data.templates) {
            const template = await Template.create({
                name: templateData.name,
                description: templateData.description,
                price: templateData.price
            });


            const templateCategories = await Category.findAll({
                where: {
                    name: templateData.categories
                }
            });
            await template.addCategories(templateCategories);


            const templateTechnologies = await Technology.findAll({
                where: {
                    name: templateData.technologies
                }
            });
            await template.addTechnologies(templateTechnologies);
        }

        res.status(200).send('Data loaded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while loading the data.');
    }
}
module.exports = {
    getTemplates,
    getTemplateById,
    loadDb,
    getTechnologies,
    getCategories
}