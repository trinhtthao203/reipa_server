"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      Posts.belongsTo(models.Furnitures, { foreignKey: "furniture_id" });
      Posts.belongsTo(models.Juridicals, { foreignKey: "juridical_id" });
      Posts.belongsTo(models.Status, { foreignKey: "status_id" });
      Posts.belongsTo(models.Typeof_posts, { foreignKey: "typeof_posts_id" });
      Posts.belongsTo(models.Typeof_real_estates, { foreignKey: "typeof_real_estate_id" });
      Posts.belongsTo(models.Provinces, { foreignKey: "province_id" });
      Posts.belongsTo(models.Districts, { foreignKey: "district_id" });
      Posts.belongsTo(models.Wards, { foreignKey: "ward_id" });
      Posts.belongsTo(models.Streets, { foreignKey: "street_id" });
      Posts.belongsTo(models.Users, { foreignKey: "user_id" });
      Posts.hasMany(models.Images, { foreignKey: "post_id" });
    }
  }
  Posts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    area: DataTypes.FLOAT,
    address: DataTypes.STRING,
    structure: DataTypes.INTEGER,
    bedroom: DataTypes.INTEGER,
    toilet: DataTypes.INTEGER,
    geometry: DataTypes.GEOMETRY,
    user_id: DataTypes.INTEGER,
    furniture_id: DataTypes.INTEGER,
    juridical_id: DataTypes.INTEGER,
    province_id: DataTypes.INTEGER,
    district_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    street_id: DataTypes.INTEGER,
    typeof_real_estate_id: DataTypes.INTEGER,
    typeof_posts_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Posts",
  });
  return Posts;
};