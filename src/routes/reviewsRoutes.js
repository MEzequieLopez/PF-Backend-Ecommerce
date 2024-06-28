const { getReviews, postReview, getReviewsTemplate, getReviewsUser } = require("../handlers/reviewsHandlers");
const reviewsRouter = require("express").Router();
const loginRequire = require("../middlewares/loginRequire");

reviewsRouter
    .get("/all", getReviews)
    
    .get("/:id", getReviewsTemplate)
    .post("/",  loginRequire, postReview)
    .get('/', loginRequire, getReviewsUser)
    
   
    

module.exports = reviewsRouter;