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


const postReviewServices = async (userId, templeId, obj) => {
    try {
        
        const existingReview = await Review.findOne({
            where: {
                idUser: userId,
                idTemplate: data.idTemplate
            }
        });

        if (existingReview) {
            throw new Error(`El usuario ya ha dejado una opinión para esta plantilla`);
        }
        const requiredFields = ['rating', 'content', 'idTemplate'];
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


const getReviewsUserServices = async (idUser) => {
    if (!idUser) {
      throw new Error('User ID is required');
    }
    
    const user = await User.findOne({
        where: { id: idUser },
        include: {
        model: Review,
        as: 'reviews',
        //through: {
        //    attributes: []
        //}
      }
    });  
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  };

  const deleteReviewUserServices = async (id) => {
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            throw new Error(`Review con id ${id} no encontrada`);
        }
        await review.destroy();
        return { message: 'Review eliminada' };
    } catch (error) {
        console.error('Error:', error.message);
        return error;
    }
};

const updateReviewServices = async (id, data) => {
    try {
        const review = await Review.findByPk(id);

        if (!review) {
            throw new Error('Review not found');
        }

        await review.update(data);
        return review;
    } catch (error) {
        console.error('Error:', error.message);
        return error;
    }
};


  


module.exports = {
    getReviewsDetailServices,
    getReviewsUserServices,
    postReviewServices,
    deleteReviewUserServices,
    updateReviewServices,
 }