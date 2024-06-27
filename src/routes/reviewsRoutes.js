const { getReviews, postReview, getReviewsTemplate } = require("../handlers/reviewsHandlers");
const reviewsRouter = require("express").Router();
const loginRequire = require("../middlewares/loginRequire");

reviewsRouter
    .get("/", getReviews)
    .get("/:id", getReviewsTemplate)
    .post("/",  postReview)
    

module.exports = reviewsRouter;