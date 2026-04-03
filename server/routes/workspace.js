const express = require("express")
const router = express.Router();
 const{
    update
} = require("../controllers/updateProject")
const auth = require("../middlewares/login")
const Project = require("../models/project");


router.get("/:id",auth,async(req,res)=>{
 const id = await req.params.id
 
    const project = await Project.findOne({ 
        _id: id ,
        user: req.user.userId 
    });
   
    return res.render("workspace",{project:project})
})

router.post("/:id",auth,update);
module.exports = router;