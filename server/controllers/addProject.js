const Project= require("../models/project");
const logActivity = require("../utils/logActivity");


async function add(req,res) {
const { title,description,difficulty,techStack,category} = req.body;

    
    const P = await Project.create({
         title:title,
        description:description,
        difficulty:difficulty,
        techStack:techStack,
        category:category,
        user: req.user.userId,
     });
     await logActivity({
  userId:req.user.userId,
  projectId: P._id,
  type: "PROJECT_CREATED",
  message: `Created project: ${title}`
});

    return res.redirect("/");
}


 module.exports = { add };