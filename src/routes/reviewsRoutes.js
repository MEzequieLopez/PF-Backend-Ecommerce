const { getReviewsUser, getReviewsTemplate, postReview } = require("../handlers/reviewsHandlers");
const loginRequire = require("../middlewares/loginRequire");
const reviewsRouter = require("express").Router();

reviewsRouter
    .get("/template", getReviewsTemplate)
    .get("/", loginRequire, getReviewsUser)
    .post("/", loginRequire, postReview)


module.exports = reviewsRouter;