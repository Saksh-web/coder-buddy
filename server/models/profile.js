const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one profile per user
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