const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config(); 
const jwtSecret = process.env.JWT_SECRET;
const userRegister = require("./routes/register");
const userLogin = require("./routes/login")
const addProject = require("./routes/addProject")
const workspace = require("./routes/workspace")


//connections

const connect = require("./connection");
connect("mongodb://127.0.0.1:27017/coder-buddy")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
// middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("file started");



const Project = require("./models/project");

const auth = require("./middlewares/login");

app.get("/", auth, async (req, res) => {
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
app.use("/register",userRegister)
app.use("/login",userLogin)
app.use("/addProject",addProject)
app.use("/workspace",workspace)




app.listen(3000, () => {
  console.log("Server running on port 3000");
});
