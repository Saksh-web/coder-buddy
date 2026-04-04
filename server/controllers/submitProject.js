const Project = require("../models/project");

async function submitProject(req, res) {
  try {
    const id = req.params.id;

    if (!id) return res.send("Project ID missing");

    await Project.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId // ensure user owns the project
      },
      {
        submitted: "yes"
      }
    );

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.send("Something went wrong");
  }
}

module.exports = { submitProject };