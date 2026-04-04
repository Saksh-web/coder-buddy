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

  // timeSpent: {
  //   type: Number, // in hours
  //   default: 0
  // },
 submitted: {
    type: String,
    enum: ["yes", "no"],
    default: "no"
  },
  assignedBy: {
    type: String,
    
    default: "selfAssigned"
  },
  recipientEmail: {
    type: String,
    
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
   dueDate: {
    type: Date,
    required:false
  }
});

module.exports = mongoose.model("Project", projectSchema);