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
  return (req, file, cb) => {
    let regexExtention = /.*/;
    if (typeFile === "image") {
      regexExtention = /\.(jpg|png|JPG|JPEG|PNG|gif|GIF)$/;
    } else if (typeFile === "document") {
      regexExtention = /\.(pdf|doc|docx|ppt|pptx|xls|xlsx)$/;
    }
    if (file.fieldname === field) {
      if (!file.originalname.match(regexExtention)) {
        console.log("--->", file);
        req.fileVallidationError = `${file.originalname} not supported ${typeFile} format`;
        return cb(new Error(`format type not supported`), false);
      }
    }
    cb(null, true);
  };
};

exports.maxSize = (sizeInMB) => sizeInMB * 1024 * 1024;
