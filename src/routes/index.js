const routes = require("express").Router();

//import route
const users = require("./user");

//user route
routes.use(users);

module.exports = routes;
