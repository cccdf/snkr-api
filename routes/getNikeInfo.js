var express = require("express");
var router = express.Router();
var nike = require("../models/nike");

router.get("/", function(req, res, next) {
  nike.find({}, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.jsonp(docs.slice(0, 4));
    } else {
      throw err;
    }
  });
});
module.exports = router;
