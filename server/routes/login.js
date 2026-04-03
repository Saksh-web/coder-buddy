const express = require("express")
const router = express.Router();
const{
   isRegistered
} = require("../controllers/login")

router.get("/",(req,res)=>{
    return res.render("login")
})

router.post("/",isRegistered);

module.exports = router;