const { registerUser, loginUser } = require("../handlers/userHandlers");
const userRouter = require("express").Router();

userRouter
    .post("/register", registerUser)
    .post("/login", loginUser)

module.exports = userRouter