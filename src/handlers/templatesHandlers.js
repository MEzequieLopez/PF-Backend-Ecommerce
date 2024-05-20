const { getFilteredTemplates } = require("../services/templatesServices");
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

        res.status(200).json(templates);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the templates.');
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
    loadDb
}