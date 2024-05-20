const { Category, Technology, Template } = require("../db");

const getFilteredTemplates = async ({ technology, category, sortBy, order, page, pageSize }) => {
    const technologyFilter = technology ? { name: technology } : {};
    const categoryFilter = category ? { name: category } : {};

    // Configurar ordenamiento
    const orderArray = [];
    if (sortBy && order) {
        orderArray.push([sortBy, order.toUpperCase()]);
    }

    // Configurar paginación
    const limit = pageSize ? parseInt(pageSize) : null;
    const offset = page ? (parseInt(page) - 1) * (limit || 0) : null;

    try {
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

        return templates;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the templates.');
    }

}

module.exports = {
    getFilteredTemplates
}