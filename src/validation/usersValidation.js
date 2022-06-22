//import packege
const { unlink } = require("fs");
const sharp = require("sharp");
const { validationResult, body, param } = require("express-validator");

// file management
const { imgProfileUpload } = require("../midleware/multerConfig");

// file image profile validation
exports.registerImageValidation = (req, res, next) => {
  imgProfileUpload(req, res, (err) => {
    let errSchema = {
      status: "failed",
      message: "failed validate file or form",
    };
    if (req.fileVallidationError) {
      errSchema.message = req.fileVallidationError;
      return res.status(400).json(errSchema);
    }

    if (err) {
      if ((err.code = "LIMIT_FILE_SIZE")) {
        errSchema.message = "must be singgle image and max size is 5 Mb";
        return res.status(400).json(errSchema);
      }
      errSchema.message = err;
      return res.status(400).json(errSchema);
    }
    return next();
  });
};

// body register user validation
exports.registerBodyValidation = [
  body("fullname")
    .toLowerCase()
    .notEmpty()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name format must be string")
    .bail()
    .isLength({ min: 3 })
    .withMessage("min length is 3 char")
    .bail()
    .escape()
    .trim(),
  body("email")
    .toLowerCase()
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email must be valid")
    .bail()
    .normalizeEmail(),
  body("phone")
    .optional()
    .isString()
    .withMessage("phone format must be string")
    .bail()
    .isMobilePhone()
    .withMessage("phone number must be valid")
    .bail()
    .isLength({ min: 10 })
    .withMessage("min length is 10 number"),
  body("gender")
    .toLowerCase()
    .notEmpty()
    .withMessage("gender is required")
    .bail()
    .isIn(["male", "female"])
    .withMessage("select your gender is male or female"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("min length is 6 char"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password should not be empty")
    .bail()
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("password and confirm pass doesnt match");
      }
      return true;
    }),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      if (req.file) {
        unlink(req.file.path, (err) => {
          if (err) console.log("> ", err);
        });
      }

      return res.status(400).json({
        status: "failed",
        message: "validate form data",
        error: error,
      });
    }

    if (req.file) {
      // resize images upload to large and small
      sharp(req.file.path)
        .resize(400, 400)
        .toFile(`./public/images/profile/lg/${req.file.filename}`, (err) => {
          if (err) throw err;
          sharp(`./public/images/profile/lg/${req.file.filename}`)
            .resize(100, 100)
            .toFile(
              `./public/images/profile/sm/${req.file.filename}`,
              (err) => {
                if (err) throw err;
                // remove original image upload
                unlink(req.file.path, (err) => {
                  if (err) console.log("> ", err);
                });
              }
            );
        });
    }

    next();
  },
];
