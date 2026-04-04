const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Clear the JWT cookie
  res.clearCookie("token");

  // Redirect to login page
  return res.redirect("/login");
});

module.exports = router;