const express = require("express")
const router = express.Router();
const{
add
} = require("../controllers/addProject")
const auth = require("../middlewares/login")
router.get("/",auth,(req,res)=>{
    return res.render("addProject")
})

router.post("/",auth,add);

module.exports = router;