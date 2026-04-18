const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
 
  bio: {
    type: String,
    maxlength: 300
  },

  skills: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"]
      }
    }
  ],

  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ],

  contacts: {
    github: String,
    linkedin: String,
    email:String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User',userSchema);

module.exports = User;