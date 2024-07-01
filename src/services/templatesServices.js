const { Category, Technology, Template, Review } = require("../db");
const { Sequelize, Op } = require("sequelize");


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
    let product= await Template.findByPk(id, {
      
      include: [{
          model:Review,
          as: "reviews"
      },{
        model: Technology,
        through: {
            attributes: [],
          }
    },
    {
      model: Category,
      through: {
          attributes: [],
        }
  },


    ],
  } )
      return product;
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while fetching the template.', status: 500 };
}
}

const searchTemplateByTechnology = async (req, res) => {
    const technologyName = req.query.technology;
    console.log("Searching for technology:", technologyName);
  
    try {
      const technologies = await Technology.findAll({
        where: {
          name: {
            [Op.iLike]: `%${technologyName}%`, 
          },
        },
        include: [
          {
            model: Template,
            through: { attributes: [] }, 
          },
        ],
      });
  
      if (technologies.length === 0) {
        console.log("Technology not found:", technologyName);
        return res.status(404).json({ error: "Technology not found" });
      }
  
      const formattedTechnologies = technologies.map((tech) => ({
        id: tech.id,
        
        templates: tech.templates.map((template) => ({
          technology: tech.name,
          id: template.id,
          name: template.name,
          description: template.description,
          price: template.price,
        })),
      }));
  
      console.log("Technologies found:", formattedTechnologies);
      res.status(200).json(formattedTechnologies);
    } catch (error) {
      console.error("Error searching by technology:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
    

module.exports = {
    getFilteredTemplates,
    getTemplateId,
    getAllCategories,
    getAllTechnologies,
    searchTemplateByTechnology
}