const { Review, User, Template } = require('../db');

const getReviewsServices = async ()=> {
    return await Review.findAll()
}

const getReviewsByTemplateIdServices = async (id)=>{
    try {
        const reviews = await Template.findOne({
            
            where: { id: id },
            include: [{
              model: Review,
              as: 'reviews',
              
            }]
          });

          return reviews
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while fetching the reviews.', status: 500 };
    }
}



/*const postReviewServices = async (data)=>{
    try {
        if(!data.id || !data.rating || !data.content || !data.idTemplate) throw 'Faltan datos obligatorios';
        else{
            let dataReview= {
                id:data.id,
                rating:data.rating,
                content:data.content,
                
                idTemplate:data.idTemplate
            }
            let newReview = await Review.create(dataReview);
            return newReview;
        }
    } catch (error) {
        console.error(error);
        return error
    }
}
*/

const postReviewServices = async (userId, data) => {
    try {
        
        const requiredFields = ['rating', 'content', 'idTemplate'];
        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error(`Falta el campo obligatorio: ${field}`);
            }
        }
        const user = await User.findByPk(userId);
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`Usuario con id ${userId} no encontrado`);
            throw new Error(`Usuario con id ${userId} no encontrado`);
        }
        const template = await Template.findByPk(data.idTemplate);
        if (!template) {
            throw new Error(`Plantilla con id ${data.idTemplate} no encontrada`);
        }
        let dataReview = {
            idUser: userId,
            rating: data.rating,
            content: data.content,
            idTemplate: data.idTemplate
        };

        let newReview = await Review.create(dataReview);
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
    console.log('ID recibido en el servicio:', idUser);
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
  


module.exports = {
    getReviewsServices,
    getReviewsByTemplateIdServices,
    getReviewsUserServices,
    postReviewServices
 }