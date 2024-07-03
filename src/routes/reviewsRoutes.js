const { postReview, getReviewsTemplate, getReviewsUser, deleteReview, updateReview } = require("../handlers/reviewsHandlers");
const reviewsRouter = require("express").Router();
const loginRequire = require("../middlewares/loginRequire");
const reviewsRouter = require("express").Router();

reviewsRouter
    //.get("/all", getReviews)
    
    .get("/:id", getReviewsTemplate)
    .post("/",  loginRequire, postReview)
    .get('/', loginRequire, getReviewsUser)
    .put('/:id', loginRequire,updateReview)
    .delete('/:id', loginRequire, deleteReview);


module.exports = reviewsRouter;