'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Furnitures', [
      {
        name: "Khác",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cơ bản",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Đầy đủ",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Furnitures', null, {});
  }
};