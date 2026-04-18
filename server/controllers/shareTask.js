const Project = require("../models/project");
const User = require("../models/user");
const logActivity = require("../utils/logActivity");
async function shareTask(req, res) {
  try {
    const { email, title, description, difficulty, techStack, category,dueDate } = req.body;
   if(!email) {
    //user wants a public post by default
 
    const P = await Project.create({
      title: title,
      description: description,
      difficulty: difficulty,
      techStack: techStack ? techStack.split(",").map(t => t.trim()) : [],
      category: category,
                
      assignedBy: req.user.email, 
      
      dueDate
      
      
    });
   await logActivity({
  userId: req.user.userId, // YOU
  projectId: P._id,       
  
  type: "PROJECT_SHARED",
   message: `shared a public project: ${P.title} `
});
   }
   else{

    // Find recipient
    const recipient = await User.findOne({ email });
    if (!recipient) {
      return res.send("Recipient not found");
    }
    const P = await Project.create({
      title: title,
      description: description,
      difficulty: difficulty,
      techStack: techStack ? techStack.split(",").map(t => t.trim()) : [],
      category: category,
      user: recipient._id,           
      assignedBy: req.user.email, 
      recipientEmail:email,  
      dueDate
      
      
    });
   await logActivity({
  userId: req.user.userId, // YOU
  projectId: P._id,       
  targetUserId:recipient._id,     // RECEIVER
  type: "PROJECT_SHARED",
   message: `shared project: ${P.title}`
});
   }

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error sharing task");
  }
}

module.exports = { shareTask };