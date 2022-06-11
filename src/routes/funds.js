const route = require("express").Router();

//import midleware
const { fundImageFormValidation } = require("../controllers/fileUpload");
//import validation
const { fundIdValidation } = require("../validation/fundValidation");
// import controllers
const { newFunds, getFunds, getFundById } = require("../controllers/funds");

route.get("/fund/:id", fundIdValidation, getFundById);
route.get("/funds", getFunds);
route.post("/fund", fundImageFormValidation("img"), newFunds);

module.exports = route;
