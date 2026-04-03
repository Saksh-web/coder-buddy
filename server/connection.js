// connections.js
const mongoose = require("mongoose");

const connect = (url) => {
  return mongoose.connect(url); // no extra options
};

module.exports = connect;