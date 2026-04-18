const express = require("express")
const router = express.Router();

const { update } = require("../controllers/updateProject")
const { recieve } = require("../controllers/recieveProject")
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
router.post("/recieve/update/:id", auth, recieve);


router.post('/saveSolution/:id', auth, async (req, res) => {
  const { solution } = req.body;
  const projectId = req.params.id;
  try {
    await Project.findByIdAndUpdate(projectId, { solution });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});




const { spawn } = require("child_process");

router.post("/runCode/:id", auth, async (req, res) => {
    const { code } = req.body;

    let output = "";
    let errorOccurred = false;

    const child = spawn("node", ["-e", code]);

    child.stdout.on("data", (data) => {
        output += data.toString();
    });

    child.stderr.on("data", (data) => {
        output += "Error: " + data.toString();
        errorOccurred = true;
    });

    child.on("close", () => {
        res.json({ output, error: errorOccurred });
    });
});

module.exports = router;