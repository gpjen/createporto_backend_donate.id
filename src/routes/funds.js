const route = require("express").Router();

// import controllers
const { newFunds, getFunds, getFundById } = require("../controllers/funds");

route.get("/fund/:id", getFundById);
route.get("/funds", getFunds);
route.post("/fund", newFunds);

module.exports = route;
