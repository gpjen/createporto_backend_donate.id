const multer = require("multer");
const { storage, maxSize, fileFilter } = require("../config/fileMulter");

//validator
const { addFundValidation } = require("../validation/fundValidation");

exports.fundImageFormValidation = (fieldImg) => {
  // set multer
  const dirSave = "public/images/img_thumb";
  const sizeInMb = 2;
  const maxFileUpload = 3;
  const typeFile = "image";
  const upload = multer({
    storage: storage(dirSave),
    fileFilter: fileFilter(fieldImg, typeFile),
    limits: {
      fileSize: maxSize(sizeInMb),
    },
  }).array(fieldImg, maxFileUpload);

  return (req, res, next) => {
    upload(req, res, function (err) {
      let errorMessage = {
        status: "failed",
        message: "",
      };

      if (req.fileVallidationError) {
        errorMessage.message = req.fileVallidationError;
        return res.status(400).json(errorMessage);
      }
      if (req.files.length === 0 && !err) {
        errorMessage.message = `please select ${typeFile} upload`;
        return res.status(400).json(errorMessage);
      }
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          console.log("handle this file size");
        } else if ((err.code = "LIMIT_UNEXPECTED_FILE")) {
          errorMessage.message = `max ${typeFile} upload is ${maxFileUpload} `;
          return res.status(400).json(errorMessage);
        }
        return res.status(400).json({
          status: "failed",
          message: err,
        });
      }
      return next();
    });
  };
};
