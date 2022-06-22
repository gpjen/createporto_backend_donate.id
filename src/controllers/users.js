//import package
const { unlink, unlinkSync } = require("fs");
const { hashedText } = require("../../app/config/bcryptHashWord");

// import models
const { users } = require("../../app/db/models");

// create user / register
exports.registerUser = async (req, res, next) => {
  const { fullname, email, phone, gender, password } = req.body;
  const profile = req.file?.filename || "none";

  try {
    users.create({
      fullname,
      email,
      phone,
      gender,
      profile,
      status: "user",
      password: await hashedText(password),
    });
    res.status(200).json({
      status: "success",
      message: "create new user",
    });
  } catch (error) {
    //remove convert image
    if (req.file) {
      unlink(`./public/images/profile/lg/${req.file.filename}`, (err) => {
        if (err) console.log("> ", err);
      });
      unlink(`./public/images/profile/sm/${req.file.filename}`, (err) => {
        if (err) console.log("> ", err);
      });
    }
    next(error);
  }
};
