const express = require("express");
const router = express.Router();
const auth = require("../middlewares/login");
const Project = require("../models/project");

// Display a verified project
router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);

    if (!project) return res.send("Project not found");


    return res.render("displayProject", { project });
  } catch (err) {
    console.error(err);
    return res.send("Something went wrong");
  }
});


module.exports = router;