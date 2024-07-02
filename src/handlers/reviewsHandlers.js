const { getReviewsDetailServices, getReviewsUserServices, postReviewServices } = require("../services/reviewsServices")

const getReviewsTemplate = async (req, res) => {
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
}

const getReviewsUser = async (req, res) => {
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
}

const postReview = async (req, res) => {
    const userId = req.userId
    const templeId = req.body.templateId
    const obj = req.body

    console.log(userId)
    console.log(templeId)
    console.log(obj)

    try {
        let newReview = await postReviewServices(userId, templeId, obj);

        return res.status(200).send(newReview)

    } catch (error) {
        console.error(error);
       return res.status(404).send(error)

    }

}

module.exports = {
    getReviewsUser,
    getReviewsTemplate,
    postReview
}
