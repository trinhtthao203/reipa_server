'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Typeof_zonings', [{
      name: "Quy hoạch cấp Tỉnh/Thành phố",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Quy hoạch cấp Quận/Huyện",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Quy hoạch cấp Xã/Phường",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Quy hoạch khác",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Typeof_zonings', null, {});
  }
};