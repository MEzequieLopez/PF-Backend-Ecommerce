const { registerUser, loginUser, addFavorite, getFavorites, deleteFavorite } = require("../handlers/userHandlers");
const loginRequire = require("../middlewares/loginRequire");
const userRouter = require("express").Router();

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/favorite", loginRequire, addFavorite)
    .get("/favorite",loginRequire, getFavorites)
    .delete("/favorite",loginRequire, deleteFavorite)

module.exports = userRouter