const express = require("express")
const router = express.Router();

const Project = require("../models/project");

const auth = require("../middlewares/login");

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.userId });

    res.render("home", {
      projects   
    });
  } catch (err) {
    console.error(err);
    res.send("cannot fetch your projects");
  }
});

module.exports = router;