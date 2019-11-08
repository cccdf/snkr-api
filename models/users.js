const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: String,
  name: String,
  password: String
});

module.exports = mongoose.model("users", usersSchema);
