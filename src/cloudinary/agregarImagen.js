const { Category, Technology, Template, Image } = require("../db");
const data = require("../../Data.json");
const { buscarImagensEnCarpetas } = require("../utils/imageSearch");
const guardaImagenes = async (template,  templateData) => {
    try {
      const responsee = await Category.findAll();
      const carpetasDetalle = data.carpetasDetalle;
      const carpetasPortada = data.carpetasPortada;

      
        // Obtiene las imágenes para la categoría actual
        const allImagenes = await buscarImagensEnCarpetas(templateData.categories[0]);
        // Filtra las primeras 4 imágenes del array obtenido
        const firstFourImagenes = allImagenes.slice(0, 4);
        
        // Procesa las primeras 4 imágenes
        for (let t = 0; t <  responsee.length; t++) {
        for (let i = 0; i < firstFourImagenes.length; i++) {
          const index = `${firstFourImagenes[i].categoryy}${i + 1}`;
          console.log(index);
          if (!firstFourImagenes[i].url ||!firstFourImagenes[i].carpeta) {
            console.error('Datos inválidos para la imagen:', firstFourImagenes[i]);
            continue;
          }
    
            const existingImage = await Image.findOne({ where: { set: index } });
            if (existingImage) {
              await responsee[t].addImage(existingImage);
              await template.addImage(existingImage);
            } else {
              const newImage = await Image.create({
                content: firstFourImagenes[i].url,
                set: index,
                isCover: firstFourImagenes[i].isCover,
                category: templateData.categories[0]
              });
          
              await responsee[t].addImage(newImage);
              await template.addImage(newImage);
            }
          }
        //   imagesProcessed++; // Incrementa el contador de imágenes procesadas
        //   if (imagesProcessed >= 4) { // Si se han procesado 4 imágenes, sale del bucle interno
        //    continue;
        //   }
    }

        // Si se han procesado 4 imágenes, sale del bucle externo
        // if (imagesProcessed >= 4) {
        //   break;
        // }
      
    } catch (error) {
      console.error("Error guardando imágenes:", error);
    }
  
}
  module.exports = { guardaImagenes };
