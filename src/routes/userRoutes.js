const { registerUser, loginUser, addFavorite, getFavorites, deleteFavorite } = require("../handlers/userHandlers");
const loginRequire = require("../middlewares/loginRequire");
const userRouter = require("express").Router();

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/favorite", loginRequire, addFavorite)
    .get("/:userId/favorite", getFavorites)
    .delete("/:userId/favorite/:templateId", deleteFavorite)

module.exports = userRouter