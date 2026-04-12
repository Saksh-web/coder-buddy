const Project = require("../models/project");
const logActivity = require("../utils/logActivity");

// Accept the project: mark submitted as "yes"
async function acceptReply(req, res) {
  try {
    const id = req.params.id;

    const project = await Project.findById(id);
    if (!project) return res.send("Project not found");

    await Project.findByIdAndUpdate(id, { submitted: "yes",feedback: "***" });
    
 await logActivity({
  userId: req.user.userId, 
  projectId: req.params.id,       
  
  type: "PROJECT_REVIEWED",
   message: `reviewed project: ${project.title} , set pass `
});
await logActivity({
  userId: project.user, 
  projectId: req.params.id,       
  
  type: "PROJECT_ACCEPTED",
   message: `project_ ${project.title}_ got accepted .`
});

    return res.redirect("/"); // go back
  } catch (err) {
    console.error(err);
    return res.send("Something went wrong");
  }
}

// ......Reject the project: mark submitted as "no", save feedback and update due date.......................,.
async function rejectReply(req, res) {
  try {
    const id = req.params.id;
    const { feedback, newDueDate } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.send("Project not found");

    const updateData = {
      submitted: "no",
      feedback: feedback || ""
    };

    if (newDueDate) {
      updateData.dueDate = new Date(newDueDate);
    }

    await Project.findByIdAndUpdate(id, updateData);
    
     await logActivity({
  userId: req.user.userId, 
  projectId: req.params.id,       
  
  type: "PROJECT_REVIEWED",
   message: `reviewed project: ${project.title} , set fail `
}); 
await logActivity({
  userId: project.user, 
  projectId: req.params.id,       
  
  type: "PROJECT_REJECTED",
   message: `project_ ${project.title}_ got rejected .`
});
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.send("Something went wrong");
  }
}

module.exports = {
  acceptReply,
  rejectReply
};