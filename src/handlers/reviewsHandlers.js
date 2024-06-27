const { getReviewsServices, postReviewServices, getReviewsByTemplateIdServices} = require("../services/reviewsServices")

const getReviews = async (req, res) => {
    try {
        const response = await getReviewsServices()
        
        if(!response || Object.keys(response).length === 0 ){
            res.status(404).send('No reviews found')
        }
        
        res.status(200).send(response)

    } catch (error) {
        console.error(error);
        return res.json(error);
    }
}

const getReviewsTemplate = async (req, res) => {
    const { id } = req.params;
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


const postReview = async (req, res) => {
    try {
        let newReview = await postReviewServices(req.body);
        res.status(200).json(newReview);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ error: error.message }); 
    }
};

module.exports = {
    getReviews,
    getReviewsTemplate,
    postReview
}