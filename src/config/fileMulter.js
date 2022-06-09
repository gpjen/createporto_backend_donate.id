//import mackage multer
const multer = require("multer");

exports.storage = (dir) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
    },
  });
};

exports.fileFilter = (field, typeFile = "file") => {
  let regexExtention = /.*/;
  if (typeFile === "image") {
    regexExtention = /\.(jpg|png|JPG|JPEG|PNG|gif|GIF)$/;
  } else if (typeFile === "document") {
    regexExtention = /\.(pdf|doc|docx|ppt|pptx|xls|xlsx)$/;
  }
  return (req, file, cb) => {
    if (file.fieldname === field) {
      if (!file.originalname.match(regexExtention)) {
        req.fileVallidationError = `only ${typeFile} file allowed`;
        return cb(new Error(`only ${typeFile} file format allowed`), false);
      }
    }
    cb(null, true);
  };
};

exports.maxSize = (sizeInMB) => sizeInMB * 1024 * 1000;
