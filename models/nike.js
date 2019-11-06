const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nikeSchema = new Schema({
  title: String,
  price: String,
  product_link: String,
  image_link: String
});

module.exports = mongoose.model("nike", nikeSchema);
