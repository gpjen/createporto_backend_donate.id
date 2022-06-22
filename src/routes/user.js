const route = require("express").Router();

const { registerUser } = require("../controllers/users");

// import validate
const {
  registerBodyValidation,
  registerImageValidation,
} = require("../validation/usersValidation");

// route
route.post(
  "/user",
  registerImageValidation,
  registerBodyValidation,
  registerUser
);

module.exports = route;
