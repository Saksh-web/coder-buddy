const express = require("express");
const router = express.Router();

const Project = require("../models/project");
const auth = require("../middlewares/login");

router.get("/", auth, async (req, res) => {
  try {
    const userProjects = await Project.find({ user: req.user.userId });

    // Submitted (ONLY here)
    const submittedProjects = userProjects.filter(
      p => p.submitted === "yes"
    );

    // Self Assigned (NOT submitted)
    const selfAssignedProjects = userProjects.filter(
      p => p.submitted === "no" && p.assignedBy === "selfAssigned"
    );

    // Received (NOT submitted)
    const receivedProjects = userProjects.filter(
      p => p.submitted === "no" && p.assignedBy !== "selfAssigned"
    );

    // Sent (NOT submitted)
    const sentProjects = await Project.find({
      assignedBy: req.user.email,
      submitted:"no"
    });
    //replies (sent +submitted =!no)
    const replies = await Project.find({
         assignedBy: req.user.email,
      submitted: { $ne: "no" } 
    });
    //pending for verification (recieved + submitted = "pending")
    const toVerify = userProjects.filter(
      p => p.submitted === "pending" && p.assignedBy !== "selfAssigned"
    );

    res.render("home", {
      submittedProjects,
      selfAssignedProjects,
      receivedProjects,
      sentProjects,
      toVerify,
      replies
    });

  } catch (err) {
    console.error(err);
    res.send("cannot fetch your projects");
  }
});

module.exports = router;