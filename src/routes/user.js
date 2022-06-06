const route = require("express").Router();

const { registerUser } = require("../controllers/users");
route.post("/user", registerUser);

module.exports = route;
