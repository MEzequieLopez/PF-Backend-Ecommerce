const cloudinary = require('cloudinary').v2;
const { Category} = require("../db");

const createImagesDetail = async (urls, categories) => {
    // Suponemos que 'categories' es un array de nombres de categorías y 'urls' es un array de URLs.
    // Necesitamos una forma de asociar cada URL con su categoría correspondiente.
    // Esto podría hacerse pasando un objeto donde las claves son los nombres de categorías y los valores son arrays de URLs.
  
    // Primero, buscamos una categoría que no exista en la base de datos
    let nonExistentCategory = null;
    let resultados = []
    let existeCategory = null
    for (let categoryName of categories) {
      const existingCategory = await Category.findOne({ where: { name: categoryName.trim() } });
      if (!existingCategory) {
        nonExistentCategory = categoryName.trim();
        break; // Salimos del bucle una vez que encontramos la primera categoría que no existe
      } else {
       existeCategory = existingCategory[0]
      }
    }
  
    // Si no se encontró ninguna categoría que no exista, terminamos aquí
    if (!nonExistentCategory) {
        const folderNameExist = `${existeCategory}_DetailUser`;
        for (let url of urls) {
            const resultado = await cloudinary.uploader.upload(url, { folder: folderNameExist });
            console.log(`Imagen subida: ${resultado.secure_url}`);
            resultados.push({
              url: resultado.secure_url,
              set: false,
            })
          }
    }else{
  
    const folderName = `${nonExistentCategory}_DetailUser`;

    for (let url of urls) {
      const resultado = await cloudinary.uploader.upload(url, { folder: folderName });
      console.log(`Imagen subida: ${resultado.secure_url}`);
      resultados.push({
        url: resultado.secure_url,
        set: false,
      })
    }
}
return resultados
    // Opcional: Aquí podrías crear la nueva categoría en tu base de datos
    // await Category.create({ name: nonExistentCategory, images: folderName });
  };
  

module.exports = {createImagesDetail}