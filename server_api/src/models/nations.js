"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nations extends Model {
    static associate(models) {
      Nations.hasMany(models.Provinces, { foreignKey: "nation_id" });
    }
  }
  Nations.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Nations",
  });
  return Nations;
};