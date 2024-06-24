const cloudinary = require("../cloudinary")

async function buscarImagensEnCarpetas() {
    try {
        // let carpeta = "VegaStore"
      const opcionesBusqueda = {
        folder: "VegaStore",
        max_results: 10 // Número máximo de resultados
      };

      const resultadosBusqueda = await cloudinary.search
       .expression(`folder:VegaStore`)
       .sort_by('public_id')
       .max_results(opcionesBusqueda.max_results)
       .execute();
  
    const urls = resultadosBusqueda.resources.map(respuesta => {
     return respuesta.secure_url
    })
       return urls
    } catch (error) {
      console.error('Error buscando imágenes:', error);
    }
  }
 
  module.exports = {buscarImagensEnCarpetas}
  