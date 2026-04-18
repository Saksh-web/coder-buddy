const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy"
  },

  techStack: [
    {
      type: String,
      trim: true
    }
  ],

  category: {
    type: String,
    enum: ["DSA", "Web Dev", "College", "Learning"],
    default: "Web Dev"
  },

 
 submitted: {
    type: String,
    enum: ["yes", "no","pending"],
    default: "no"
  },
  assignedBy: {
    type: String,
    
    default: "selfAssigned"
  },
  recipientEmail: {
    type: String,
    default:"public",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  solution: {
  type: String,
  default: ""
},
   dueDate: {
    type: Date,
    required:false
  },feedback: {
    type:String
  }
});

module.exports = mongoose.model("Project", projectSchema);