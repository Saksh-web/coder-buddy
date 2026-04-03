const Project= require("../models/project");


async function add(req,res) {
const { title,description,difficulty,techStack,category} = req.body;

    
    await Project.create({
         title:title,
        description:description,
        difficulty:difficulty,
        techStack:techStack,
        category:category,
        user: req.user.userId,
     });

    return res.redirect("/");
}


 module.exports = { add };