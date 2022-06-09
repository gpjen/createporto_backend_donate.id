const multer = require("multer");
const { storage, maxSize, fileFilter } = require("../config/fileMulter");

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

  // req handling
  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileVallidationError) {
        return res.status(400).json({
          message: req.fileVallidationError,
        });
      }
      if (!req.files && !err) {
        return res.status(400).json({
          message: `please select ${typeFile} upload`,
        });
      }
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: `max ${typeFile} size is ${sizeInMb} Mb`,
          });
        } else if ((err.code = "LIMIT_UNEXPECTED_FILE")) {
          return res.status(400).json({
            message: `max ${typeFile} upload is ${maxFileUpload} `,
          });
        }
        return res.status(400).json({
          message: err,
        });
      }
      return next();
    });
  };
};
