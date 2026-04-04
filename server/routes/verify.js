const express = require("express")
const router = express.Router();
const{
    acceptReply,rejectReply
} = require("../controllers/verification")


const auth = require("../middlewares/login")
const Project = require("../models/project");
router.post("/accept/:id",auth,acceptReply)
router.post("/reject/:id",auth,rejectReply)


router.get("/:id",auth,async(req,res)=>{
    const id =  req.params.id
    const project = await Project.findById(id)
    return res.render("verify",{project})
})



module.exports = router;