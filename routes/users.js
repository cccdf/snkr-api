var express = require("express");
var Users = require("../models/users");
var User = require("../models/user");
var Favbrand = require("../models/favbrands");
var router = express.Router();
const nodeMailer = require("nodemailer");
const auth = require("../middleware/auth");

/* GET users listing. */
router.post("/register", async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    console.log(user);
    await user.save();
    const token = await user.generateAuthToken();
    console.log(user);
    // let transporter = nodeMailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     // should be replaced with real sender's account
    //     user: "snkrparadise1007@gmail.com",
    //     pass: "Snkr1007"
    //   }
    // });
    // let mailOptions = {
    //   // should be replaced with real recipient's account
    //   to: request.body.email,
    //   subject: "Snkr registration",
    //   text: "Register successfully!"
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log("Message %s sent: %s", info.messageId, info.response);
    // });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

// router.get("/cool", function(req, res, next) {
//   res.send("you are so cool");
// });

router.post("/login", async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//if exsisting query it
router.post("/favoritebrands/search", async (req, res) => {
  console.log(req.body.email);
  console.log(await Favbrand.exists({ email: req.body.email }));
  const checkExist = await Favbrand.exists({ email: req.body.email });
  if (checkExist) {
    Favbrand.find({ email: req.body.email }, (err, docs) => {
      if (!err) {
        console.log(docs);

        res.jsonp(docs);
      } else {
        throw err;
      }
    });
  } else {
    try {
      const userfav = new Favbrand(req.body);
      console.log(userfav);
      await userfav.save();
      res.status(201).send(userfav);
    } catch (error) {
      res.status(400).send(error);
    }
    res.status(204).send("doesnot exist");
  }
});

// //not exsisting then create a dom
// router.post("/favoritebrands", async (req, res) => {
//   try {
//     const userfav = new Favbrand(req.body);
//     console.log(userfav);
//     await userfav.save();
//     res.status(201).send({ userfav });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.put("/favoritebrands", async (req, res) => {
  const filter = { email: req.body.email };
  const update = { brand: req.body.brands };
  console.log(filter, update);
  let doc = await Favbrand.findOne(filter);
  await Favbrand.updateOne(filter, update, { upsert: true });
  doc.brands = req.body.brands;
  await doc.save();
  res.status(201).send({ doc });
});

router.delete("/delete", async (req, res) => {
  const filter = { email: req.body.email };
  console.log(req.body);
  if (User.find({ filter }))
    Favbrand.deleteOne(filter, err => {
      if (err) {
        return handleError(err);
      }
    });
  User.deleteOne(filter, err => {
    if (err) {
      return handleError(err);
    }
  });
  res.status(200).send("Delete successfully");
  // const filter = { email: req.body.email };
  // console.log(req.body);
  // Favbrand.deleteOne(filter, err => {
  //   if (err) {
  //     return handleError(err);
  //   }
  // });
  // User.deleteOne(filter, err => {
  //   if (err) {
  //     return handleError(err);
  //   }
  // });
  // res.status(200).send("Delete successfully");
});

// router.put("/reset", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.resetpwd(email, password);
//     if (!user) {
//       return res
//         .status(401)
//         .send({ error: "Login failed! Check authentication credentials" });
//     }

//     res.send({ user });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

router.get("/me", auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

router.post("/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post("/login", (req, res) => {
//   Users.findOne({ email: req.body.email }, (err, docs) => {
//     if (!err) {
//       if (docs === null) {
//         res.status(404).send(); //email doesnt register
//       } else {
//         const passwordDb = docs.password;
//         const passwordInput = req.body.password;
//         if (passwordDb === passwordInput) {
//           res.status(200).send();
//         } else {
//           res.status(204).send();
//         }
//       }
//     } else {
//       throw err;
//     }
//   });
// });

// router.post("/register", (request, response) => {
//   //neeed validation
//   const email = request.body.email;
//   const name = request.body.name;
//   const password = request.body.password;
//   var newuser = new Users({ email: email, name: name, password: password });
//   newuser.save(function(err) {
//     if (err) return handleError(err);
//     // saved!
//   });

//   response.writeHead(301, { Location: "index.html" });
//   response.end();

//   // response.send(request.body.email + request.body.name + request.body.password);

//   // userInfo.save();
//   // const post = request.body;
//   // post.id = db.posts.length + 1;
// });

module.exports = router;
