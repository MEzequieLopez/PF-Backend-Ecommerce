const { getReviews, postReview } = require("../handlers/reviewsHandlers");
const reviewsRouter = require("express").Router();

reviewsRouter
    .get("/", getReviews)
    .post("/", postReview)
    

module.exports = reviewsRouter;