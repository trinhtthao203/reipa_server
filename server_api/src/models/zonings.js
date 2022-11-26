"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Zonings extends Model {
    static associate(models) {
      Zonings.belongsTo(models.Provinces, { foreignKey: "province_id" });
      Zonings.belongsTo(models.Districts, { foreignKey: "district_id" });
      Zonings.belongsTo(models.Wards, { foreignKey: "ward_id" });
      Zonings.belongsTo(models.Users, { foreignKey: "user_id" });
      Zonings.belongsTo(models.Typeof_zonings, { foreignKey: "typeof_zoning_id" });
      Zonings.belongsTo(models.Status, { foreignKey: "status_id" });
      Zonings.hasMany(models.Images, { foreignKey: "zoning_id" });
    }
  }
  Zonings.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    purpose: DataTypes.STRING,
    area: DataTypes.FLOAT,
    width: DataTypes.FLOAT,
    length: DataTypes.FLOAT,
    address: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
    ispolygon: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    ward_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    typeof_zoning_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Zonings",
  });
  return Zonings;
};