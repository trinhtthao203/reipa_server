"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Districts extends Model {
    static associate(models) {
      Districts.belongsTo(models.Provinces, { foreignKey: "province_id" });
      Districts.hasMany(models.Wards, { foreignKey: "district_id" });
      Districts.hasMany(models.Streets, { foreignKey: "district_id" });
      Districts.hasMany(models.Zonings, { foreignKey: "district_id" });
      Districts.hasMany(models.Posts, { foreignKey: "district_id" });
    }
  }
  Districts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    province_id: DataTypes.INTEGER,
    geometry: DataTypes.GEOMETRY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Districts",
  });
  return Districts;
};