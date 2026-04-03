const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createNewUser(req, res) {
  try{const { username, email, password } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);
await User.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    
    return res.render("login");
}catch(error){console.log("user or email already exists :", error.message);}
}
module.exports = { createNewUser };