'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        force: true
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      address: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.FLOAT
      },
      juridical_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Juridicals",
          key: "id"
        }
      },
      furniture_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Furnitures",
          key: "id"
        }
      },
      structure: {
        type: Sequelize.INTEGER
      },
      bedroom: {
        type: Sequelize.STRING
      },
      toilet: {
        type: Sequelize.STRING
      },
      geometry: {
        type: Sequelize.GEOMETRY
      },
      status_id: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      street_id: {
        type: Sequelize.INTEGER
      },
      ward_id: {
        type: Sequelize.INTEGER
      },
      province_id: {
        type: Sequelize.INTEGER
      },
      district_id: {
        type: Sequelize.INTEGER
      },
      typeof_real_estate_id: {
        type: Sequelize.INTEGER
      },
      typeof_posts_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};