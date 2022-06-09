const route = require("express").Router();

//import midleware
const { fundImageFormValidation } = require("../controllers/fileUpload");
// import controllers
const { newFunds, getFunds, getFundById } = require("../controllers/funds");

route.get("/fund/:id", getFundById);
route.get("/funds", getFunds);
route.post("/fund", fundImageFormValidation("img"), newFunds);

module.exports = route;
