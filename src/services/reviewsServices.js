const { Review } = require('../db');

const getReviewsServices = async ()=> {
    return await Review.findAll()
}


const postReviewServices = async (obj)=>{
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

module.exports = {
    getReviewsServices,
    postReviewServices

 }