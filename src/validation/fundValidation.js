const { validationResult, body, param } = require("express-validator");

// models
const { funds } = require("../../app/db/models");

exports.addFundValidation = (req) => {
  const { tittle, goal, desc, idUser } = req.body;
  if (tittle === "" || tittle.length <= 3) {
    return "tittle kosong";
  }
  return true;
};

exports.fundIdValidation = [
  param("id")
    .trim()
    .isNumeric()
    .withMessage("params must be number")
    .bail()
    .custom(async (val) => {
      const fundId = await funds.findOne({
        where: {
          id: val,
        },
      });
      if (!fundId) {
        return Promise.reject("invalid params Id");
      }
    }),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "failed",
        message: "failed param validation",
        error: error.errors,
      });
    }
    next();
  },
];

exports.createFundBodyValidation = [
  body("tittle")
    .notEmpty()
    .withMessage("tittle is require")
    .bail()
    .isLength({ min: 3 })
    .withMessage("tittle min 3 character")
    .escape(),
  body("goal")
    .notEmpty()
    .withMessage("goal is require")
    .bail()
    .isNumeric()
    .withMessage("goal must be number")
    .trim(),
  body("desc")
    .notEmpty()
    .withMessage("desc is require")
    .bail()
    .isString()
    .withMessage("desc must be string")
    .escape(),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "failed",
        message: "failed validation form",
        error: error.errors,
      });
    }
    next();
  },
];
