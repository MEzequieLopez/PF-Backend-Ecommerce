const { registerUser, loginUser, addFavorite, getFavorites, deleteFavorite } = require("../handlers/userHandlers");
const userRouter = require("express").Router();

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/favorite", addFavorite)
    .get("/:userId/favorite", getFavorites)
    .delete("/:userId/favorite/:templateId", deleteFavorite)
    
module.exports = userRouter