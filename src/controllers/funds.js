const fs = require("fs");
// import database
const {
  funds,
  payments,
  images_thumbnail,
  users,
} = require("../../app/db/models");

//create new fund
exports.newFunds = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      message: `create new fund`,
      file: req.files,
      data: req.body,
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
          model: images_thumbnail,
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

//read funds by Id
exports.getFundById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await funds.findByPk(id, {
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status", ""],
          },
        },
        {
          model: images_thumbnail,
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
      message: `find fund ${id}`,
      data: !data ? "no data" : data,
    });
  } catch (error) {
    next(error);
  }
};
