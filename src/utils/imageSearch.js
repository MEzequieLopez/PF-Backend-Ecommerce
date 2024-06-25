const cloudinary = require("../cloudinary");
const data = require("../../Data.json");

async function buscarImagensEnCarpetas(categoria) {
  try {
    let resultados = [];

    for (const imageData of data.imagenes) {
      // Determina la carpeta basada en la categoría y si la imagen es cover
      const carpeta = imageData.isCover
        ? `${categoria}_Portada`
        : `${categoria}_Detalle`;

      try {
        const resultado = await cloudinary.uploader.upload(imageData.content, {
          folder: carpeta,
        });

        resultados.push({
          url: resultado.secure_url,
          categoryy: categoria,
          carpeta: resultado.asset_folder,
          isCover: imageData.isCover,
        });

        if (resultados.length >= 4) {
          continue; // Detiene la ejecución y sale del bucle
        }
      } catch (error) {
        console.error(
          `Error cargando imagen ${imageData.content} en la carpeta ${carpeta}:`,
          error
        );
      }
    }
    return resultados;
  } catch (error) {
    console.error("Error buscando imágenes:", error);
  }
}

module.exports = { buscarImagensEnCarpetas };
//     // let carpeta = "VegaStore"
//   const opcionesBusqueda = {
//     folder: "VegaStore",
//     max_results: 10 // Número máximo de resultados
//   };

//   const resultadosBusqueda = await cloudinary.search
//    .expression(`folder:VegaStore`)
//    .sort_by('public_id')
//    .max_results(opcionesBusqueda.max_results)
//    .execute();

// const urls = resultadosBusqueda.resources.map(respuesta => {
//  return respuesta.secure_url
// })
//    return urls
