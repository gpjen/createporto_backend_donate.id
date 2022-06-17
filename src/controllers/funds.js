const { Op } = require("sequelize");
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
  const { id } = req.params;
  try {
    const data = await funds.findByPk(id, {
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
      message: `find fund ${id}`,
      data: !data ? "no data" : data,
    });
  } catch (error) {
    next(error);
  }
};

// update funds
exports.updateFunds = async (req, res, next) => {
  const idUser = 1;
  const { tittle, goal, desc } = req.body;
  const { fundId } = req.params;
  // const files = req.files.filter()

  try {
    // update fund
    // const fundData = await funds.update(
    //   { tittle, goal, desc },
    //   {
    //     where: {
    //       [Op.and]: [{ id: fundId }, { idUser }],
    //     },
    //   }
    // );

    res.status(200).json({
      status: "success",
      message: "update fund",
      body: req.body,
      file: req.files,
    });
  } catch (error) {
    next(error);
  }
};
