const express = require("express");
const app = express();
const path = require("path");
const userRegister = require("./routes/register");

// middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("file started");




app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/register",userRegister)



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
