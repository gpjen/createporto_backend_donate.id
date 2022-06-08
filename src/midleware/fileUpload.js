//import mackage multer
const multer = require("multer");

// img thumbnails handler
exports.imgHandlingUpload = async (fieldImage) => {
  // set storage and file name
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/img_thumb");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
    },
  });

  // filter file type (only images)
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === fieldImage) {
      if (!file.originalname.match(/\.(jpg|png|JPG|JPEG|PNG|gif|GIF)$/)) {
        req.fileVallidationError = "only images file allowed";
        cb(new Error("only images file formats allowed"), false);
      }
    }
    cb(null, true);
  };

  // fillter max size
  const maxSize = 1 * 1024 * 1000;

  // run multer
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(fieldImage);

  return async (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileVallidationError) {
        return res.status(400).json({
          message: req.fileVallidationError,
        });
      }
      if (!req.file && !err) {
        return res.status(400).json({
          message: "please select image upload",
        });
      }
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: `max file size is ${maxSize}`,
          });
        }
        return res.status(400).json({
          message: err,
        });
      }
    });
    return next();
  };
};
