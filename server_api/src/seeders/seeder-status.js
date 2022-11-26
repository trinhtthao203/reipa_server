'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Status', [{
      name: "Đang chờ duyệt",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Đã duyệt",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Không được duyệt",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Status', null, {});
  }
};