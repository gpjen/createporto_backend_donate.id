const route = require("express").Router();

//import midleware
//import validation
const { fundIdValidation } = require("../validation/fundValidation");
// import controllers
const { newFunds, getFunds, getFundById } = require("../controllers/funds");

route.get("/fund/:id", fundIdValidation, getFundById);
route.get("/funds", getFunds);
route.post("/fund", newFunds);

module.exports = route;
