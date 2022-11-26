'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Typeof_real_estates', [{
      name: "Căn hộ",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhà riêng",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhà phố thương mại",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhà biệt thự liền kề",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhà xưởng, kho bãi",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Đất nền",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cao ốc, văn phòng",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nhà trọ, phòng trọ",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cửa hàng, mặt bằng",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Bất động sản khác",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Typeof_real_estates', null, {});
  }
};