"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Juridicals extends Model {
    static associate(models) {
      Juridicals.hasMany(models.Posts, { foreignKey: "juridical_id" });
    }
  }
  Juridicals.init({
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
    modelName: "Juridicals",
  });
  return Juridicals;
};