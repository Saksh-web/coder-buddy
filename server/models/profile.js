const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one profile per user
    },
    contactLinks: {
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  }
},

    
    bio: {
      type: String,
      trim: true,
      maxlength: 300
    },


    skills: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],
    
    starsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);



module.exports = mongoose.model("Profile", profileSchema);