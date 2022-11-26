"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Typeof_posts extends Model {
    static associate(models) {
      Typeof_posts.hasMany(models.Posts, { foreignKey: "typeof_posts_id" });
    }
  }
  Typeof_posts.init({
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
    modelName: "Typeof_posts",
  });
  return Typeof_posts;
};