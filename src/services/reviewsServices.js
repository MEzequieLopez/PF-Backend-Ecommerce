const { Review } = require('../db');

const getReviewsServices = async ()=> {
    return await Review.findAll()
}

const postReviewServices = async ({content, rating, date, templateId })=> {
    try {
        if( /*!emailUser || */ !content || !rating || !date || !templateId){
            throw 'Missing data!';
        } 
        else{

            let review= {
                //email del usuario
                content: content,
                rating: rating,
                date: date,
                templateId: templateId
            }
            let newReview = await Review.create(review);
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