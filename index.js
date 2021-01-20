const express = require("express");
const app = express();
const config = require("./config/key");
const mongoose = require("mongoose");
const User = require("./models/User");
const bodyParser = require("body-parser");

const POST = 5000;
//aplication/x-www-form-urlencoded분석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json분석
app.use(bodyParser.json());

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

app.listen(POST, () => console.log(`http://localhost:5000`));
