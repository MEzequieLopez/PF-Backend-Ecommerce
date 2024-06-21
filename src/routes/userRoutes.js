const { registerUser, loginUser, addFavorite, getFavorites, deleteFavorite, getUserById } = require("../handlers/userHandlers");
const loginRequire = require("../middlewares/loginRequire");
const userRouter = require("express").Router();

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/",loginRequire,)
    .post("/favorite", loginRequire, addFavorite)
    .get("/favorite",loginRequire, getFavorites)
    .delete("/favorite",loginRequire, deleteFavorite)
    .get('/:idUser', getUserById)
module.exports = userRouter