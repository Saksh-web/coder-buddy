const express = require("express")
const router = express.Router();
const{
    shareTask
} = require("../controllers/shareTask")
const auth = require("../middlewares/login");
router.get("/",auth,(req,res)=>{
    return res.render("shareTask")
})

router.post("/",auth,shareTask);
module.exports = router;