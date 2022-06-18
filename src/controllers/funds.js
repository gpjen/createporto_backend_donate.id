const { Op } = require("sequelize");
const fs = require("fs");
const sharp = require("sharp");
// import database
const {
  funds,
  payments,
  imagesThumbnails,
  users,
} = require("../../app/db/models");

//create new fund
exports.newFunds = async (req, res, next) => {
  const { tittle, goal, desc } = req.body;
  const idUser = req.user?.id || 1;
  const img = req.files.map((i) => i.filename);

  try {
    // input form to database
    const addFundsData = await funds.create({ tittle, goal, desc, idUser });
    // input images to databse
    img.map((i) =>
      imagesThumbnails.create({ img: i, idFund: addFundsData.id })
    );

    res.status(200).json({
      status: "success",
      message: `create new fund`,
    });
  } catch (error) {
    next(error);
  }
};

// read all funds
exports.getFunds = async (req, res, next) => {
  try {
    const data = await funds.findAll({
      include: [
        {
          model: users,
          as: "user",
          attributes: ["id", "fullname", "email", "phone", "profile", "gender"],
        },
        {
          model: payments,
          as: "payment",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: imagesThumbnails,
          as: "img-thumb",
          attributes: ["img"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "idUser"],
      },
    });

    res.status(200).json({
      status: "success",
      message: "get all funds",
      data: !data ? "no data" : data,
    });
  } catch (error) {
    next(error);
  }
};

// read funds by Id
exports.getFundById = async (req, res, next) => {
  const { fundId } = req.params;
  try {
    const data = await funds.findByPk(fundId, {
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
        {
          model: imagesThumbnails,
          as: "img-thumb",
          attributes: ["img"],
        },
        {
          model: payments,
          as: "payment",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    res.status(200).json({
      status: "success",
      message: `find fund ${fundId}`,
      data: !data ? "no data" : data,
    });
  } catch (error) {
    next(error);
  }
};

// update funds
exports.updateFunds = async (req, res, next) => {
  const idUser = 1;
  const { fundId } = req.params;
  const { tittle, goal, desc } = req.body;
  const imageUpdate = [req.files?.img1, req.files?.img2, req.files?.img3];

  try {
    // update imagesThumbnails
    const imagesDb = await imagesThumbnails.findAll({
      where: {
        idFund: req.params.fundId,
      },
      attributes: ["id", "img"],
    });

    const updateImg = (imgDb, newImg) => {
      imagesThumbnails.update(
        { img: newImg.filename },
        { where: { id: imgDb.id } }
      );
      sharp(newImg.path)
        .resize(600)
        .toFile(`./public/images/img_thumb/${newImg.filename}`)
        .then(() => {
          fs.unlink(newImg.path, (err) => {
            if (err) console.log("failed delete new images");
          });

          fs.unlink(`./public/images/img_thumb/${imgDb.img}`, (err) => {
            if (err) console.log("failed delete images db");
          });
        });
    };

    const addImg = (img) => {
      imagesThumbnails.create({ img: img.filename, idFund: fundId });
      sharp(img.path)
        .resize(600)
        .toFile(`./public/images/img_thumb/${img.filename}`)
        .then(() => {
          fs.unlink(img.path, (err) => {
            if (err) console.log("failed delete new images");
          });
        });
    };

    imageUpdate.forEach((image) => {
      if (image) {
        const { fieldname } = image[0];

        if (fieldname === "img1") {
          imagesDb[0]?.id ? updateImg(imagesDb[0], image[0]) : addImg(image[0]);
        } else if (fieldname === "img2") {
          imagesDb[1]?.id ? updateImg(imagesDb[1], image[0]) : addImg(image[0]);
        } else if (fieldname === "img3") {
          imagesDb[2]?.id ? updateImg(imagesDb[2], image[0]) : addImg(image[0]);
        }
      }
    });

    // update fund
    funds.update(
      { tittle, goal, desc },
      {
        where: {
          [Op.and]: [{ id: fundId }, { idUser }],
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "update fund",
    });
  } catch (error) {
    next(error);
  }
};

// delete user
exports.deleteFundById = async (req, res, next) => {
  const { fundId } = req.params;
  try {
    // get images name
    const fileImgDb = await imagesThumbnails.findAll({
      where: { idFund: fundId },
    });

    // delete fund
    funds.destroy({ where: { id: fundId } });

    // delete images
    fileImgDb.forEach((img) => {
      fs.unlink(`./public/images/img_thumb/${img.img}`, (err) => {
        if (err) console.log("failed del images");
      });
    });

    //response
    res.status(200).json({
      status: "success",
      message: "delete fund",
    });
  } catch (error) {
    next(error);
  }
};
