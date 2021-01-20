const express = require("express");
const app = express();
const POST = 5000;
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PW}@cluster0.isp9u.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`,
    {
      userNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Mongoodb Connect");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(POST, () => console.log(`http://localhost:5000`));
