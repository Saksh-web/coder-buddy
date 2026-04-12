const Project = require("../models/project");

async function deleteProject(req, res) {
    
  try {
    const id = req.params.id; 
    if (!id) return res.send("Project ID missing");

   
    await Project.findOneAndDelete({
      _id: id,
      user: req.user.userId 
    });
   
    return res.redirect("/"); 
  } catch (err) {
    console.error(err);
    return res.send("Something went wrong");
  }
}

module.exports = { deleteProject };