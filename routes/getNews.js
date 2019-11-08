var express = require("express");
var router = express.Router();
var news = require("../models/news");

router.get("/", function(req, res, next) {
  news.find({}, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.jsonp(docs);
    } else {
      throw err;
    }
  });
});
module.exports = router;
