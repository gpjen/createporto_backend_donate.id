const multer = require("multer");
const { storage, fileFilter } = require("../config/fileMulter");

//validator
const { addFundValidation } = require("../validation/fundValidation");

exports.fundImageFormValidation = (fieldImg) => {
  // set multer
  const dirSave = "public/images/img_thumb";
  const sizeInMb = 2 * 1040 * 1040;
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

      const imageLimitSize = req.files.filter((file) => file.size > sizeInMb);

      if (imageLimitSize.length > 0) {
        errorMessage.message = `Limit file size`;
        errorMessage.fileError = imageLimitSize;
        return res.status(400).json(errorMessage);
      }

      if (req.fileVallidationError) {
        errorMessage.message = req.fileVallidationError;
        return res.status(400).json(errorMessage);
      }
      if (req.files.length === 0 && !err) {
        errorMessage.message = `please select ${typeFile} upload`;
        return res.status(400).json(errorMessage);
      }
      if (err) {
        if ((err.code = "LIMIT_UNEXPECTED_FILE")) {
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
