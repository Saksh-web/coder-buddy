const express = require("express");
const router = express.Router();

const Profile = require("../models/profile");
const auth = require("../middlewares/login");

// GET PROFILE
router.get("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.userId });

    // fallback if no profile
    if (!profile) {
      profile = {
        bio: "",
        skills: [],
        starsCount: 0,
        contactLinks: {}
      };
    }

    res.render("profile", { profile });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


// UPDATE PROFILE
router.post("/update", auth, async (req, res) => {
  try {
    const {
      bio,
      skills,
      email,
      phone,
      linkedin,
      github,
      portfolio
    } = req.body;

    // 🔥 skills → array
    let skillsArray = [];
    if (skills) {
      skillsArray = skills
        .split(",")
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 0);
    }

    let profile = await Profile.findOne({ user: req.user.userId });

    const updateData = {
      bio: bio || "",
      skills: skillsArray,
      contactLinks: {
        email: email || "",
        phone: phone || "",
        linkedin: linkedin || "",
        github: github || "",
        portfolio: portfolio || ""
      }
    };

    if (!profile) {
      profile = new Profile({
        user: req.user.userId,
        ...updateData
      });
    } else {
      Object.assign(profile, updateData);
    }

    await profile.save();

    res.redirect("/profile");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;