'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images_thumbnail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  images_thumbnail.init({
    img: DataTypes.STRING,
    idFund: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'images_thumbnail',
  });
  return images_thumbnail;
};