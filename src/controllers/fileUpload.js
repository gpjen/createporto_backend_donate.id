const multer = require("multer");
const { storage, fileFilter, resizeImgThumb } = require("../config/fileMulter");

//validator
const { addFundValidation } = require("../validation/fundValidation");

exports.fundImageFormValidation = (fieldImg) => {
  // set multer
  const dirSave = "public/images/uploads";
  const maxFileUpload = 3;
  const typeFile = "image";
  const upload = multer({
    storage: storage(dirSave),
    fileFilter: fileFilter(fieldImg, typeFile),
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
      } else if (req.files.length === 0 && !err) {
        errorMessage.message = `please select ${typeFile} upload`;
        return res.status(400).json(errorMessage);
      }

      if (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          errorMessage.message = `max ${typeFile} upload is ${maxFileUpload} `;
          return res.status(400).json(errorMessage);
        }
        return res.status(400).json({
          status: "failed",
          message: err,
        });
      }
      resizeImgThumb(req);
      return next();
    });
  };
};
