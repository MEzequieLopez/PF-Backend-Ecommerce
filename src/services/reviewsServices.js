const { Review, User, Template } = require('../db');

const getReviewsDetailServices = async (templateId)=> {

    try {
        const template = await Review.findAll({where: {templateId: templateId}})
        if(!template){
            console.log("Template not found");
        return { error: "Template not found" };
        }
        return template
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
    
} 
const getReviewsUserServices = async (userId)=> {

    try {
        const user = await Review.findAll({where: {userId: userId}})
        if(!user){
            console.log("User not found");
        return { error: "User not found" };
        }
        return user
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
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

const postReviewServices = async (userId, templeId, obj) => {
    try {
        
        const requiredFields = ['rating', 'content'];
        for (const field of requiredFields) {
            if (!obj[field]) {
                throw new Error(`Falta el campo obligatorio: ${field}`);
            }
        }
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`Usuario con id ${userId} no encontrado`);
        }
        const template = await Template.findByPk(templeId);
        if (!template) {
            throw new Error(`Plantilla con id ${templeId} no encontrada`);
        }
        let objReview = {
            //idUser: obj.idUser,
            rating: obj.rating,
            content: obj.content,
            //idTemplate: obj.idTemplate
        };

        let newReview = await Review.create(objReview);
        await newReview.setUser(userId);
        await newReview.setTemplate(templeId);
        return newReview;
    } catch (error) {
        console.error('Error:', error.message);
        throw error; 
    }
};
module.exports = {
    getReviewsDetailServices,
    getReviewsUserServices,
    postReviewServices
 }