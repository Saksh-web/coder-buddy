const Project = require("../models/project");
const User = require("../models/user");

async function shareTask(req, res) {
  try {
    const { email, title, description, difficulty, techStack, category,dueDate } = req.body;

    // Find recipient
    const recipient = await User.findOne({ email });
    if (!recipient) {
      return res.send("Recipient not found");
    }


    await Project.create({
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

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error sharing task");
  }
}

module.exports = { shareTask };