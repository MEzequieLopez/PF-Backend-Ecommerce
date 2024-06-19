const { registerUser, loginUser, addFavorite, getFavorites, deleteFavorite } = require("../handlers/userHandlers");
const loginRequire = require("../middlewares/loginRequire");
const userRouter = require("express").Router();

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)
<<<<<<< HEAD
    .post("/favorite", addFavorite)
    .get("/:userId/favorite", getFavorites)
    .delete("/:userId/favorite/:templateId", deleteFavorite)
    
=======
    .get("/",loginRequire,)
    .post("/favorite", loginRequire, addFavorite)
    .get("/favorite",loginRequire, getFavorites)
    .delete("/favorite",loginRequire, deleteFavorite)

>>>>>>> 08708f9f0cea59f6071b599a5f517f2bb2d046f3
module.exports = userRouter