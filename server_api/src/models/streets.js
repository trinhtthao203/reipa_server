"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Streets extends Model {
    static associate(models) {
      Streets.hasMany(models.Users, { foreignKey: "street_id" });
      Streets.hasMany(models.Posts, { foreignKey: "street_id" });
      Streets.belongsTo(models.Districts, { foreignKey: "district_id" });
      Streets.belongsTo(models.Provinces, { foreignKey: "province_id" });
    }
  }
  Streets.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    prefix: DataTypes.STRING,
    province_id: DataTypes.INTEGER,
    district_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Streets",
  });
  return Streets;
};