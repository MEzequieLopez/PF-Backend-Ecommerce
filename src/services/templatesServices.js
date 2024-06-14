const { Category, Technology, Template } = require("../db");

const getFilteredTemplates = async ({ technology, category, sortBy, order, page, pageSize }) => {
    const technologyFilter = technology ? { name: technology.split(',') } : {};
    const categoryFilter = category ? { name: category.split(',') } : {};

    try {
        const orderArray = [];
        if (sortBy && order) {
            orderArray.push([ sortBy, order.toUpperCase() ]);
        }

        const limit = pageSize ? parseInt(pageSize) : null;
        const offset = page ? (parseInt(page) - 1) * (limit || 0) : null;
        
        const totalCount = await Template.count();
        const templates = await Template.findAll({
            include: [
                {
                    model: Technology,
                    where: technologyFilter,
                    required: !!technology // Incluir solo si hay un filtro de tecnología
                },
                {
                    model: Category,
                    where: categoryFilter,
                    required: !!category // Incluir solo si hay un filtro de categoría
                }
            ],
            order: orderArray.length ? orderArray : undefined,
            limit: limit !== null ? limit : undefined,
            offset: offset !== null ? offset : undefined
        });
        const totalPages = Math.ceil(totalCount/ limit);
        if (!templates.length) {
            return { error: "No hay plantillas con esa etiqueta", status: 404 }
        }
        return { data: templates, totalPages: totalPages, status: 200 };
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while fetching the templates.', status: 500 };
    }

}

const getAllCategories = async () => {
    try {
        const response = await Category.findAll()
        return response
    } catch (error) {
        return error
    }
}

const getAllTechnologies = async () => {
    try {
        const response = await Technology.findAll()
        return response
    } catch (error) {
        return error
    }
}

const getTemplateId = async (id) => {

    try {
        const response = await Template.findAll({
            include: [
                {
                    model: Technology,
                },
                {
                    model: Category,
                }
            ]

        })
        const templateId = response.find((template) => template.id.toString() === id.toString())
        return templateId

    } catch (error) {
        return error
    }

}

module.exports = {
    getFilteredTemplates,
    getTemplateId,
    getAllCategories,
    getAllTechnologies
}