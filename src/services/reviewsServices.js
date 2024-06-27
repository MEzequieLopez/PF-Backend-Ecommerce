const { Review, User, Template } = require('../db');

const getReviewsServices = async ()=> {
    return await Review.findAll()
}
//
const getReviewsByTemplateIdServices = async (id)=>{
    try {
        const reviews = await Template.findOne({
            
            where: { id: id },
            include: [{
              model: Review,
              as: 'reviews' 
            }]
          });

          return reviews
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while fetching the reviews.', status: 500 };
    }
}



/*const postReviewServices = async (obj)=>{
    try {
        if(!obj.idUser || !obj.rating || !obj.content || !obj.idTemplate) throw 'Faltan datos obligatorios';
        else{
            let objReview= {
                idUser:obj.idUser,
                rating:obj.rating,
                content:obj.content,
                
                idTemplate:obj.idTemplate
            }
            let newReview = await Review.create(objReview);
            return newReview;
        }
    } catch (error) {
        console.error(error);
        return error
    }
}
*/

const postReviewServices = async (obj) => {
    try {
        
        const requiredFields = ['idUser', 'rating', 'content', 'idTemplate'];
        for (const field of requiredFields) {
            if (!obj[field]) {
                throw new Error(`Falta el campo obligatorio: ${field}`);
            }
        }
        const user = await User.findByPk(obj.idUser);
        if (!user) {
            throw new Error(`Usuario con id ${obj.idUser} no encontrado`);
        }
        const template = await Template.findByPk(obj.idTemplate);
        if (!template) {
            throw new Error(`Plantilla con id ${obj.idTemplate} no encontrada`);
        }
        let objReview = {
            idUser: obj.idUser,
            rating: obj.rating,
            content: obj.content,
            idTemplate: obj.idTemplate
        };

        let newReview = await Review.create(objReview);
        return newReview;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
};
module.exports = {
    getReviewsServices,
    getReviewsByTemplateIdServices,
    postReviewServices

 }