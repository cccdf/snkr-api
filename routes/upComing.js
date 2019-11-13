var express = require("express");
var router = express.Router();
var upcoming = require("../models/upcoming");

router.get("/", function(req, res, next) {
  upcoming.find({}, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.jsonp(docs);
    } else {
      throw err;
    }
  });
});
module.exports = router;
