const routes = require("express").Router();

//user route
const users = require("./user");
routes.use(users);

// funds route
const funds = require("./funds");
routes.use(funds);

module.exports = routes;
