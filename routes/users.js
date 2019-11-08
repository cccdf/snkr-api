var express = require("express");
var Users = require("../models/users");
var router = express.Router();
const nodeMailer = require("nodemailer");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/cool", function(req, res, next) {
  res.send("you are so cool");
});

router.post("/login", (req, res) => {
  Users.findOne({ email: req.body.email }, (err, docs) => {
    if (!err) {
      if (docs === null) {
        res.status(404).send(); //email doesnt register
      } else {
        const passwordDb = docs.password;
        const passwordInput = req.body.password;
        if (passwordDb === passwordInput) {
          res.status(200).send();
        } else {
          res.status(204).send();
        }
      }
    } else {
      throw err;
    }
  });
});

router.post("/register", (request, response) => {
  //neeed validation
  const email = request.body.email;
  const name = request.body.name;
  const password = request.body.password;
  var newuser = new Users({ email: email, name: name, password: password });
  newuser.save(function(err) {
    if (err) return handleError(err);
    // saved!
  });
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: "snkrparadise1007@gmail.com",
      pass: "Snkr1007"
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    to: request.body.email,
    subject: "Snkr registration",
    text: "Register successfully!"
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
  response.writeHead(301, { Location: "index.html" });
  response.end();

  // response.send(request.body.email + request.body.name + request.body.password);

  // userInfo.save();
  // const post = request.body;
  // post.id = db.posts.length + 1;
});

module.exports = router;
