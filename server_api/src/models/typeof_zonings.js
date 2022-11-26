"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Typeof_zonings extends Model {
    static associate(models) {
      Typeof_zonings.hasMany(models.Zonings, { foreignKey: "typeof_zoning_id" });
    }
  }
  Typeof_zonings.init({
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
    modelName: "Typeof_zonings",
  });
  return Typeof_zonings;
};