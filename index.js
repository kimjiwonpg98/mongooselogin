const express = require("express");
const app = express();
const config = require("./config/key");
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const cookieParser = require("cookie-parser");

const POST = 5000;
//aplication/x-www-form-urlencoded분석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json분석
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongoodb Connect");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  // user모델에 저장
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 맞는 유저가 없습니다.",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("user", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(POST, () => console.log(`http://localhost:5000`));
