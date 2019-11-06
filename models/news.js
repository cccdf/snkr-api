const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  date: String,
  time: String,
  tweet: String
  //   photos: String
});

module.exports = mongoose.model("news", newsSchema);
