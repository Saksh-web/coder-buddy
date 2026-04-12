const Activity = require("../models/activity");

const logActivity = async (data) => {
  try {
    await Activity.create(data);
  } catch (err) {
    console.error("Activity Log Error:", err.message);
  }
};

module.exports = logActivity;