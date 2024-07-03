const { postReview, getReviewsTemplate, getReviewsUser, deleteReview, updateReview, getTemplateAverageRatings } = require("../handlers/reviewsHandlers");
const reviewsRouter = require("express").Router();
const loginRequire = require("../middlewares/loginRequire");

reviewsRouter
    //.get("/all", getReviews)
    .get("/template-ratings", getTemplateAverageRatings)
    .get("/:id", getReviewsTemplate)
    .post("/",  loginRequire, postReview)
    .get('/', loginRequire, getReviewsUser)
    .delete('/:id', loginRequire, deleteReview)
    .put('/', loginRequire, updateReview)
    
   
    

module.exports = reviewsRouter;