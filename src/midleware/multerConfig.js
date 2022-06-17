const multer = require("multer");

// set destination and namefile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/fileUploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
  },
});

// set filter file
const imgFilter = (field) => {
  return (req, file, cb) => {
    if (file.fieldname === field) {
      if (!file.originalname.match(/\.(jpg|png|JPG|JPEG|PNG|gif|GIF)$/)) {
        req.fileVallidationError = `${file.originalname} not supported format`;
        return cb(new Error(`format type not supported`), false);
      }
    } else {
      cb(new Error(`diferent field image`), false);
    }
    cb(null, true);
  };
};

//img-thumbnail uploads  (multi-images)
exports.imgThumbUpload = multer({
  storage,
  fileFilter: imgFilter("img_thumb"),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).array("img_thumb", 3);

// set filter update file
const imgFilterUpdate = (req, file, cb) => {
  if (
    file.fieldname === "img1" ||
    file.fieldname === "img2" ||
    file.fieldname === "img3"
  ) {
    if (!file.originalname.match(/\.(jpg|png|JPG|JPEG|PNG|gif|GIF)$/)) {
      req.fileVallidationError = `${file.originalname} not supported format`;
      return cb(new Error(`format type not supported`), false);
    }
  } else {
    cb(new Error(`diferent field image`), false);
  }
  cb(null, true);
};

//img-thumbnail update img thumb
exports.imgThumbUpdate = multer({
  storage,
  fileFilter: imgFilterUpdate,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).fields([
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
]);
