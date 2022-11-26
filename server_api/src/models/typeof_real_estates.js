"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Typeof_real_estates extends Model {
    static associate(models) {
      Typeof_real_estates.hasMany(models.Posts, { foreignKey: "typeof_real_estate_id" });
    }
  }
  Typeof_real_estates.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Typeof_real_estates",
  });
  return Typeof_real_estates;
};