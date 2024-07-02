const cloudinary = require("cloudinary").v2;
const { Category } = require("../db");
const DEFAULT_URL ="https://noticias.uai.cl/assets/uploads/2022/08/portadas-notas-web-44-980x470-c-default.png";

const createImageCovers = async (url, categories) => {

  let nonExistentCategory = null;
  let resultados = [];
  let existeCategory = null;
  const imageToUpload = url.length > 0 ? url[0] : DEFAULT_URL;
  
  for (let categoryName of categories) {
    const existingCategory = await Category.findOne({
      where: { name: categoryName.trim() },
    });
    if (!existingCategory) {
      nonExistentCategory = categoryName.trim();
      break; // Salimos del bucle una vez que encontramos la primera categoría que no existe
    } else {
      existeCategory = existingCategory[0];
    }
  }

  if (!nonExistentCategory) {
    const folderNameExist = `${existeCategory}_CoverUser`;

    const resultado = await cloudinary.uploader.upload(imageToUpload, {
      folder: folderNameExist,
    });
    console.log(`Imagen subida: ${resultado.secure_url}`);
    resultados.push({
      url: resultado.secure_url,
      set: true,
    });
  } else {
    const folderName = `${nonExistentCategory}_CoverUser`;

    const resultado = await cloudinary.uploader.upload(imageToUpload, {
      folder: folderName,
    });
    console.log(`Imagen subida: ${resultado.secure_url}`);
    resultados.push({
      url: resultado.secure_url,
      set: true,
    });
  }
  return resultados;
};

module.exports = { createImageCovers };
