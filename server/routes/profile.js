const express = require("express")
const router = express.Router();

const Profile = require("../models/profile");
const auth = require("../middlewares/login")

router.get("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.userId });

    // if profile doesn't exist, send empty object
    if (!profile) {
      profile = {
        bio: "",
        skills: [],
        starsCount: 0
      };
    }

    res.render("profile", { profile });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
router.post("/update", auth, async (req, res) => {
    console.log("USER:", req.user);
  try {
    const { bio, skills } = req.body;


    let skillsArray = [];
    if (skills) {
      skillsArray = skills
        .split(",")
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 0);
    }

    // see if profile exists
    let profile = await Profile.findOne({ user: req.user.userId });

    if (!profile) {
      // if not ,Create new profile
      profile = new Profile({
        user: req.user.userId,
        bio: bio || "",
        skills: skillsArray
      });

      await profile.save();

    } else {
      
      profile.bio = bio || "";
      profile.skills = skillsArray;

      await profile.save();
    }

    //Redirect back 
    res.redirect("/profile");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;