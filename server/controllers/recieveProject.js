const Project = require("../models/project");
const logActivity = require("../utils/logActivity");
async function recieve(req, res) {
  try {
    const id = req.params.id;

   
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id,  }, 
      {
       user:req.user.userId 
      },
      { new: true }
    );
         await logActivity({
  userId:req.user.userId,
  projectId: req.params.id,
  type: "PROJECT_RECEIVED",
  message: `recieved a project`
}); 
    if (!updatedProject) {
      return res.send("Project not found or not yours");
    }

    return res.redirect("/"); 
  } catch (err) {
    console.error(err);
    res.send("Error updating project");
  }
}

module.exports = { recieve};