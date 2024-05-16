

const getFilteredTemplates = async (
    where,
    order,
    limit,
    offset,) => {
    try {
        const data = await Product.findAll({
            where,
            order,
            limit,
            offset,
            include: [
                { model: Category, as: 'categories', attributes: [ 'name' ] },
                { model: Technology, as: 'technologies', attributes: [ 'name' ] }
            ]
        });
        return data
    } catch (error) {
        throw error
    }

}

module.exports = {
    getFilteredTemplates
}