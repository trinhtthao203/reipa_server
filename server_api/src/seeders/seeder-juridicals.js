'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Juridicals', [
      {
        name: "Sổ đỏ/Sổ hồng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sổ đỏ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sổ hồng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Đang chờ sổ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Khác",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Juridicals', null, {});
  }
};