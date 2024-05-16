const {  getFilteredTemplates } = require("../services/templatesServices");


const getTemplates = async (req, res) => {
    try {
        let where = {};
        let order = [];
        if (req.query.category) {
            where[ '$categories.name$' ] = req.query.category;
        }
        if (req.query.technology) {
            where[ '$technologies.name$' ] = req.query.technology;
        }

        if (req.query.orderBy) {
            order = [ [ req.query.orderBy, req.query.order || 'ASC' ] ];
        }

        let limit = req.query.limit || 10;
        let page = req.query.page || 1;
        let offset = (page - 1) * limit;
        const data = await getFilteredTemplates(limit, page, offset, order, where)
        return res.send(data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getTemplates
}