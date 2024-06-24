const { getReviewsUser, getReviewsTemplate, postReview } = require("../handlers/reviewsHandlers");
const loginRequire = require("../middlewares/loginRequire");
const reviewsRouter = require("express").Router();

reviewsRouter
    .get("/", loginRequire, getReviewsUser)
    .get("/", getReviewsTemplate)
    .post("/", loginRequire, postReview)
    

module.exports = reviewsRouter;