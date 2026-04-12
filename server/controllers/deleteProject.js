const Project = require("../models/project");
const logActivity = require("../utils/logActivity");

async function deleteProject(req, res) {
    
  try {
    const id = req.params.id; 
    if (!id) return res.send("Project ID missing");
    const P = await Project.findById(id)
    if (!P) return res.send("Project is missing");
    const t =  P.title
   
    await Project.findOneAndDelete({
      _id: id,
      user: req.user.userId 
    });
      await logActivity({
  userId:req.user.userId,
  projectId: req.params.id,
  type: "PROJECT_DELETED",
  message: `deleted project: ${t}`
}); 
    return res.redirect("/"); 
  } catch (err) {
    console.error(err);
    return res.send("Something went wrong");
  }
}

module.exports = { deleteProject };