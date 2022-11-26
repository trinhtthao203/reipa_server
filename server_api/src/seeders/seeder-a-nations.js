'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Nations',
      [
        { "id": 1, "name": "Việt Nam", "geometry": null }
      ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Nations', null, {});
  }
};