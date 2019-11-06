var express = require("express");
var router = express.Router();
var news = require("../models/news");

router.get("/", function(req, res, next) {
  news.find({}, (err, docs) => {
    // if (err) return res.json({ success: false, error: err });
    // console.log('Found Users :', data);
    // res.json(data.length);
    if (!err) {
      console.log(docs);
      res.jsonp(docs);
    } else {
      throw err;
    }
  });
});
module.exports = router;
