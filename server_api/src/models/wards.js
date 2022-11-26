"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wards extends Model {
    static associate(models) {
      Wards.hasMany(models.Zonings, { foreignKey: "ward_id" });
      Wards.hasMany(models.Posts, { foreignKey: "ward_id" });
      Wards.belongsTo(models.Provinces, { foreignKey: "province_id" });
      Wards.belongsTo(models.Districts, { foreignKey: "district_id" });
    }
  }
  Wards.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    province_id: DataTypes.INTEGER,
    district_id: DataTypes.INTEGER,
    geometry: DataTypes.GEOMETRY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Wards",
  });
  return Wards;
};