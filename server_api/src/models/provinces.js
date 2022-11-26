"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provinces extends Model {
    static associate(models) {
      Provinces.belongsTo(models.Nations, { foreignKey: "nation_id" });
      Provinces.hasMany(models.Districts, { foreignKey: "province_id" });
      Provinces.hasMany(models.Streets, { foreignKey: "province_id" });
      Provinces.hasMany(models.Zonings, { foreignKey: "province_id" });
      Provinces.hasMany(models.Posts, { foreignKey: "province_id" });
    }
  }
  Provinces.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    nation_id: DataTypes.INTEGER,
    geometry: DataTypes.GEOMETRY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Provinces",
  });
  return Provinces;
};