"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Furnitures extends Model {
    static associate(models) {
      Furnitures.hasMany(models.Posts, { foreignKey: "furniture_id" });
    }
  }
  Furnitures.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: "Furnitures",
  });
  return Furnitures;
};