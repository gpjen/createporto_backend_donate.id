"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class funds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      funds.hasMany(models.payments, {
        as: "payment",
        foreignKey: {
          name: "idFund",
        },
      });

      funds.hasMany(models.images_thumbnail, {
        as: "img-thumb",
        foreignKey: {
          name: "idFund",
        },
      });

      funds.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "id",
        },
      });
    }
  }
  funds.init(
    {
      tittle: DataTypes.STRING,
      goal: DataTypes.INTEGER,
      desc: DataTypes.TEXT,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "funds",
    }
  );
  return funds;
};
