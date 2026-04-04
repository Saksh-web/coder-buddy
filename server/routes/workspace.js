const express = require("express")
const router = express.Router();

const { update } = require("../controllers/updateProject")
const { deleteProject } = require("../controllers/deleteProject")
const { submitProject } = require("../controllers/submitProject")

const auth = require("../middlewares/login")
const Project = require("../models/project");


router.post("/delete/:id", auth, deleteProject)
router.post("/submit/:id", auth, submitProject)


router.get("/:id", auth, async (req, res) => {
  const id = req.params.id

  const project = await Project.findOne({ 
    _id: id,
    user: req.user.userId 
  });

  return res.render("workspace", { project: project })
})

router.post("/update/:id", auth, update);

router.post('/saveSolution/:id', auth, async (req, res) => {
  const { solution } = req.body;
  const projectId = req.params.id;
  try {
    await Project.findByIdAndUpdate(projectId, { solution });
    res.redirect(`/workspace/${projectId}`);
  } catch (err) {
    console.error(err);
    res.send('Error saving solution');
  }
});

module.exports = router;