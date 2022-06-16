const route = require("express").Router();

//import validation
const {
  fundIdValidation,
  addFundImagesValidation,
  addFundBodyValidation,
} = require("../validation/fundValidation");
// import controllers
const {
  newFunds,
  getFunds,
  getFundById,
  updateFunds,
} = require("../controllers/funds");

route.get("/fund/:id", fundIdValidation, getFundById);
route.get("/funds", getFunds);
route.post("/fund", addFundImagesValidation, addFundBodyValidation, newFunds);
route.patch("/fund/:fundId", updateFunds);

module.exports = route;
