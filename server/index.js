const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config(); 
const jwtSecret = process.env.JWT_SECRET;
const homepage = require("./routes/homepage");
const userRegister = require("./routes/register");
const userLogin = require("./routes/login")
const userLogout = require("./routes/logout")
const addProject = require("./routes/addProject")
const workspace = require("./routes/workspace")
const shareTask = require("./routes/shareTask")


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




app.use("/",homepage)
app.use("/register",userRegister)
app.use("/login",userLogin)
app.use("/logout",userLogout)
app.use("/addProject",addProject)
app.use("/workspace",workspace)
app.use("/shareTask",shareTask)



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
