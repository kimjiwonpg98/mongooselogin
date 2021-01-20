const userSchema = require("../models/User");
const bcrypt = require("bcrypt");

const saltrounds = 10;
//next를 하면 save로 넘어간다는 뜻 ===> pre

const password = {
  crypt: () => {
    userSchema.pre("save", (next) => {
      if (userSchema.isModified("password")) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltrounds, (err, salt) => {
          if (err) return next(err);
          bcrypt.hash(userSchema.password, salt, (err, hash) => {
            if (err) return next(err);
            userSchema.password = hash;
            next();
          });
        });
      }
    });
  },
};

module.exports = password;
