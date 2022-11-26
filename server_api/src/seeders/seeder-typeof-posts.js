'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Typeof_posts', [{
      name: "Cần bán",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cần mua",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cho thuê",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cần thuê",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Typeof_posts', null, {});
  }
};