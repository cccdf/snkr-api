const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favbrandSchema = new Schema({
  email: String,
  brands: [String]
});

module.exports = mongoose.model("favbrand", favbrandSchema);
