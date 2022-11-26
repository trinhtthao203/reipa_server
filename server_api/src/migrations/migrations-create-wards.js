'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        force: true
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Provinces",
          key: "id"
        }
      },
      district_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Districts",
          key: "id"
        }
      },
      geometry: {
        type: Sequelize.GEOMETRY
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wards');
  }
};