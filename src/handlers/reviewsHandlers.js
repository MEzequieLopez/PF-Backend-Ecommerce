const { getReviewsServices, postReviewServices} = require("../services/reviewsServices")

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

const postReview = async (req, res)=> {

    try {
        let newReview = await postReviewServices(req.body);

        res.status(200).send(newReview)

    } catch (error) {
        console.error(error);
        res.status(404).send(error)
        
    }

}

module.exports = {
    getReviews,
    postReview
}