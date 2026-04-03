const Project = require("../models/project");

async function update(req, res) {
  try {
    const id = req.params.id;

    const { title, description, difficulty, techStack, category, timeSpent } = req.body;

    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, user: req.user.userId }, 
      {
        title,
        description,
        difficulty,
        techStack: techStack ? techStack.split(",") : [],
        category,
        
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.send("Project not found or not yours");
    }

    return res.redirect("/"); 
  } catch (err) {
    console.error(err);
    res.send("Error updating project");
  }
}

module.exports = { update };