const route = require("express").Router();

//import validation
const {
  fundIdValidation,
  addFundImagesValidation,
  addFundBodyValidation,
  updateFundsValidation,
  updateFundBodyParamValidation,
} = require("../validation/fundValidation");
// import controllers
const {
  newFunds,
  getFunds,
  getFundById,
  updateFunds,
  deleteFundById,
} = require("../controllers/funds");

route.get("/fund/:fundId", fundIdValidation, getFundById);
route.get("/funds", getFunds);
route.post("/fund", addFundImagesValidation, addFundBodyValidation, newFunds);
route.patch(
  "/fund/:fundId",
  updateFundsValidation,
  updateFundBodyParamValidation,
  updateFunds
);
route.delete("/fund/:fundId", fundIdValidation, deleteFundById);

module.exports = route;
