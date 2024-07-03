const { getReviewsServices, postReviewServices, getReviewsByTemplateIdServices, getReviewsUserServices} = require("../services/reviewsServices")

const { v4: uuidv4, validate: uuidValidate } = require('uuid');

/*const getReviewsTemplate = async (req, res) => {
    const templateId = req.query.templateId
    console.log(templateId)

    try {
        const response = await getReviewsDetailServices(templateId)

        if (!response || Object.keys(response).length === 0) {
            return res.status(404).send('No reviews found')
        }

        return res.status(200).send(response)

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
} */

/*const getReviewsUser = async (req, res) => {
    const userId = req.userId
    console.log(userId)
    try {
        const response = await getReviewsUserServices(userId)

        if (!response || Object.keys(response).length === 0) {
            return res.status(404).send('No user found')
        }

        return res.status(200).send(response)

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
} */

const getReviewsTemplate = async (req, res) => {
    const { id } = req.params;

   /* if (!uuidValidate(id)) {
        return res.status(400).json({ message: 'Invalid UUID format' });
    } */

    try {
        const reviews = await getReviewsByTemplateIdServices(id)
        
        if (!reviews) {
            return res.status(404).json({ message: 'Template not found' });
          }
        
        res.status(200).send(reviews)

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
}

const getReviewsUser = async (req, res) => {

  const  idUser  = req.userId
      console.log('ID recibido en el controlador:', idUser);

    try {
      
      if (!idUser) {
        return res.status(400).json({ message: 'userId is required' });
      }
  
      const reviews = await getReviewsUserServices(idUser);
  
     return res.status(200).json(reviews);
     

    } catch (error) {
      if (error.message === 'User ID is required') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };





const postReview = async (req, res) => {
  const userId= req.userId
  const data= req.body
    try {
       
        let newReview = await postReviewServices(userId, data);
        res.status(200).json(newReview);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ error: error.message }); 
    }
};

module.exports = {
    
    getReviewsTemplate,
    getReviewsUser,
    postReview
}