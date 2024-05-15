const router = require("express").Router();

router.use("/", (req,res) =>{
    console.log("Hola :D");
})

module.exports= router;