//import mackage multer
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

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
        req.fileVallidationError = `${file.originalname} not supported ${typeFile} format`;
        return cb(new Error(`format type not supported`), false);
      }
    }
    cb(null, true);
  };
};

exports.resizeImgProfile = async (req) => {
  const file = req.file;
  const dir = "./public/images/profile/";
  const dirSave = [
    { size: "lg", wh: 500 },
    { size: "sm", wh: 140 },
  ];

  dirSave.map((patern) => {
    const { size, wh } = patern;
    const path = `${dir}${size}/`;
    fs.access(path, (err) => {
      if (err) {
        fs.mkdirSync(path);
      }
    });

    sharp(file.path)
      .resize(wh, wh)
      .toFile(`${path}${file.filename}`, (err, info) => {
        if (err) throw err;
        console.log(`compress to ${size} file:${file.originalname}`);
      });
  });
};

exports.resizeImgThumb = (req) => {
  const dir = "./public/images/img_thumb";

  fs.access(dir, (err) => {
    if (err) {
      fs.mkdirSync(dir);
    }
  });

  req.files.map((file) => {
    sharp(file.path)
      .resize(600)
      .toFile(`${dir}/${file.filename}`, (err, info) => {
        if (err) throw err;
        console.log(`compress file : ${file.originalname}`);
      });
  });
};

exports.emptyDirUpload = () => {
  const dir = "./public/images/uploads";
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    Promise.all(
      files.map((f) => {
        fs.unlink(`${dir}/${f}`, (err) => {
          if (err) throw err;
        });
      })
    );
  });
};
