const Project = require("../models/project");

async function submitProject(req, res) {
  try {
    const id = req.params.id;

    if (!id) return res.send("Project ID missing");

    const proj = await Project.findById(id);
    if (!proj) return res.send("Project not found");
        //if proj is recieved
        if(proj.assignedBy !== "selfAssigned"){
            await Project.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId // ensure user owns the project
      },
      {
        submitted: "pending"
      }
    );
      await logActivity({
  userId: req.user.userId, // YOU
  projectId: proj._id,       
 
  type: "PROJECT_SENT_FOR_REVIEW",
   message: `project submitted for review ,title -: ${proj.title}`
});

        }
        else{
             await Project.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId // ensure user owns the project
      },
      {
        submitted: "yes"
      }
    );
     await logActivity({
  userId: req.user.userId, // YOU
  projectId: proj._id,       
 
  type: "PROJECT_SUBMITTED",
   message: `shared project: ${proj.title}`
});
        }
   

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.send("Something went wrong");
  }
}

module.exports = { submitProject };