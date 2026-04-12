const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    index: true
  },

  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String,
    required: true,
    enum: [
      "PROJECT_CREATED",
      "PROJECT_SHARED",
      "PROJECT_RECEIVED",
      "PROJECT_SAVED",
      "PROJECT_SUBMITTED",
      "PROJECT_DELETED",
      "PROJECT_ACCEPTED",
      "PROJECT_RJECTED",
      "PROJECT_SENT_FOR_REVIEW"
    ],
    index: true
  },

  message: {
    type: String,
    required: true
  },

  metadata: {
    type: Object,
    default: {}
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});



module.exports = mongoose.model("Activity", activitySchema);