"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class imagesThumbnails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      imagesThumbnails.belongsTo(models.funds, {
        as: "fund",
        foreignKey: {
          name: "idFund",
        },
      });
    }
  }
  imagesThumbnails.init(
    {
      img: DataTypes.STRING,
      idFund: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "imagesThumbnails",
    }
  );
  return imagesThumbnails;
};
