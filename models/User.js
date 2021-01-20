const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltrounds = 10;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
//에로우 함수는 상위 스코프를 this로 그래서 function으로 해줘야됌!!
userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltrounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
