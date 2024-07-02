const { createImageCovers } = require("../utils/createImageCover");
const { createImagesDetail } = require("../utils/createImages");
const { Sequelize, Op } = require("sequelize");
const { Category, Technology, Template, Review, Image } = require("../db");
const CreateTemplates = async (
    name,
    description,
    price,
    isCover,
    imagen,
    technology,
    category
  ) => {
    try {
      const newTemplate = await Template.create({
        name,
        description,
        price,
      });
      const categoryNames = category.split(", ");
      const TechnologyNames = technology.split(", ");
  
      for (let urlC of isCover) {
        const newImageC = await Image.create({
          original: urlC,
          isCover: true,
        });
        await newTemplate.addImage(newImageC);
      }
          
      for (let urlD of imagen) {
        const newImagesD = await Image.create({
          original: urlD,
          isCover: false,
        });
        await newTemplate.addImage(newImagesD);
      }
  
   
      const existingCategories = await Category.findAll({
        where: { name: { [Op.or]: categoryNames } }, // Usar Op.or para buscar múltiples valores
      });
  
      if (existingCategories.length > 0) {
        await newTemplate.addCategories(existingCategories);
      }
     
      for (let categoryName of categoryNames) {
        const foundCategory = existingCategories.find(
          (category) => category.name === categoryName.trim()
        );
        if (!foundCategory) {
          const newCategory = await Category.create({
            name: categoryName.trim(),
          });
          await newTemplate.addCategory(newCategory);
        }
      }
  
      const existingTechnology = await Technology.findAll({
        where: { name: { [Op.or]: TechnologyNames } }, // Usar Op.or para buscar múltiples valores
      });
      if (existingTechnology.length > 0) {
        await newTemplate.addTechnology(existingTechnology);
      }
      for (let TechnologyName of TechnologyNames) {
        const foundTechnology = existingTechnology.find(
          (technology) => technology.name === TechnologyName.trim()
        );
        if (!foundTechnology) {
  
          const newTechnology = await Technology.create({
            name: TechnologyName.trim(),
          });
  
          await newTemplate.addTechnology(newTechnology);
        }
      }
  
      return newTemplate;
    } catch (error) { console.error(error);
      return {
        error: "error when creating the template.",
        status: 500,
      };
      
    }
  };


  module.exports = {CreateTemplates}