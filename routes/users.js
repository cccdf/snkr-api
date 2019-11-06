var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/cool", function(req, res, next) {
  res.send("you are so cool");
});

router.post("/register", (request, resoonse) => {
  const post = request.body;
  post.id = db.posts.length + 1;
});

module.exports = router;
