const multer = require("multer");
const fs = require("fs");
const { storage, fileFilter, resizeImgThumb } = require("../config/fileMulter");

//validator

exports.fundImageFormValidation = (fieldImg) => {
  // set multer
  const dirUpload = "public/images/uploads";
  fs.mkdir(dirUpload, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  const maxFileUpload = 3;
  const typeFile = "image";
  const upload = multer({
    storage: storage(dirUpload),
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
