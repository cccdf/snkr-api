const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const snkrsSchema = new Schema({
  title: Array,
  date: String,
  image_link: String
});

module.exports = mongoose.model("snkrs", snkrsSchema);
