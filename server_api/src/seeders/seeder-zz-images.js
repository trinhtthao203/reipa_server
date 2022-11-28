'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        id: 1,
        name: "chung-cu-cadif-01.jpg",
        zoning_id: 1,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "chung-cu-cadif-02.jpg",
        zoning_id: 1,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "chung-cu-cadif-03.jpg",
        zoning_id: 1,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "chung-cu-cadif-04.jpg",
        zoning_id: 1,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "enriser-01.jpg",
        zoning_id: 2,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "enriser-02.jpg",
        zoning_id: 2,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "enriser-03.jpg",
        zoning_id: 2,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "hem51-01.jpg",
        zoning_id: 3,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "hem51-02.jpg",
        zoning_id: 3,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "hem51-03.jpg",
        zoning_id: 3,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "hem51-04.jpg",
        zoning_id: 3,
        post_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "post-01.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "post-02.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "post-03.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "post-04.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "post-05.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "post-06.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "post-07.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "post-08.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "post-09.jpg",
        zoning_id: null,
        post_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "post-09.jpg",
        zoning_id: null,
        post_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "datnen-01.jpg",
        zoning_id: null,
        post_id: 2,
        createdAt: new Date("5-1-22"),
        updatedAt: new Date("5-1-22"),
      },
      {
        id: 23,
        name: "datnen-02.jpg",
        zoning_id: null,
        post_id: 2,
        createdAt: new Date("5-1-22"),
        updatedAt: new Date("5-1-22"),
      },
      {
        id: 24,
        name: "datnen-03.jpg",
        zoning_id: null,
        post_id: 2,
        createdAt: new Date("5-1-22"),
        updatedAt: new Date("5-1-22"),
      },
      {
        id: 25,
        name: "chothue-01.jpg",
        zoning_id: null,
        post_id: 3,
        createdAt: new Date("5-7-22"),
        updatedAt: new Date("5-7-22"),
      },
      {
        id: 26,
        name: "chothue-02.jpg",
        zoning_id: null,
        post_id: 3,
        createdAt: new Date("5-7-22"),
        updatedAt: new Date("5-7-22"),
      },
      {
        id: 27,
        name: "chothue-03.jpg",
        zoning_id: null,
        post_id: 3,
        createdAt: new Date("5-7-22"),
        updatedAt: new Date("5-7-22"),
      },
      {
        id: 28,
        name: "chothue-04.jpg",
        zoning_id: null,
        post_id: 3,
        createdAt: new Date("5-7-22"),
        updatedAt: new Date("5-7-22"),
      },
      {
        id: 29,
        name: "nhatro-01.jpg",
        zoning_id: null,
        post_id: 5,
        createdAt: new Date("5-8-22"),
        updatedAt: new Date("5-8-22"),
      },
      {
        id: 30,
        name: "nhatro-02.jpg",
        zoning_id: null,
        post_id: 5,
        createdAt: new Date("5-8-22"),
        updatedAt: new Date("5-8-22"),
      },
      {
        id: 31,
        name: "nhatro-03.jpg",
        zoning_id: null,
        post_id: 5,
        createdAt: new Date("5-8-22"),
        updatedAt: new Date("5-8-22"),
      },
      {
        id: 32,
        name: "datnen-04.jpg",
        zoning_id: null,
        post_id: 7,
        createdAt: new Date("5-22-22"),
        updatedAt: new Date("5-22-22"),
      },
      {
        id: 33,
        name: "nhatro-05.jpg",
        zoning_id: null,
        post_id: 7,
        createdAt: new Date("5-22-22"),
        updatedAt: new Date("5-22-22"),
      },
      {
        id: 34,
        name: "nhatro-06.jpg",
        zoning_id: null,
        post_id: 7,
        createdAt: new Date("5-22-22"),
        updatedAt: new Date("5-22-22"),
      },
      {
        id: 35,
        name: "nhatro-06.jpg",
        zoning_id: null,
        post_id: 7,
        createdAt: new Date("5-22-22"),
        updatedAt: new Date("5-22-22"),
      },
      {
        id: 36,
        name: "nhatro-06.jpg",
        zoning_id: null,
        post_id: 7,
        createdAt: new Date("5-22-22"),
        updatedAt: new Date("5-22-22"),
      },
      {
        id: 37,
        name: "bannha-01.jpg",
        zoning_id: null,
        post_id: 8,
        createdAt: new Date("8-12-22"),
        updatedAt: new Date("8-12-22"),
      },
      {
        id: 38,
        name: "bannha-02.jpg",
        zoning_id: null,
        post_id: 8,
        createdAt: new Date("8-12-22"),
        updatedAt: new Date("8-12-22"),
      },
      {
        id: 39,
        name: "bannha-03.jpg",
        zoning_id: null,
        post_id: 8,
        createdAt: new Date("8-12-22"),
        updatedAt: new Date("8-12-22"),
      },
      {
        id: 40,
        name: "bannha-04.jpg",
        zoning_id: null,
        post_id: 8,
        createdAt: new Date("8-12-22"),
        updatedAt: new Date("8-12-22"),
      },
      {
        id: 41,
        name: "bannha-05.jpg",
        zoning_id: null,
        post_id: 8,
        createdAt: new Date("8-12-22"),
        updatedAt: new Date("8-12-22"),
      },
      {
        id: 42,
        name: "ktxc-01.jpg",
        zoning_id: 4,
        post_id: null,
        createdAt: new Date("5-5-22"),
        updatedAt: new Date("5-5-22"),
      },
      {
        id: 43,
        name: "ktxc-02.jpg",
        zoning_id: 4,
        post_id: null,
        createdAt: new Date("5-5-22"),
        updatedAt: new Date("5-5-22"),
      },
      {
        id: 44,
        name: "ktxc-03.jpg",
        zoning_id: 4,
        post_id: null,
        createdAt: new Date("5-5-22"),
        updatedAt: new Date("5-5-22"),
      },
      {
        id: 45,
        name: "ktxc-04.jpg",
        zoning_id: 4,
        post_id: null,
        createdAt: new Date("5-5-22"),
        updatedAt: new Date("5-5-22"),
      },
      {
        id: 46,
        name: "ktxc-05.jpg",
        zoning_id: 4,
        post_id: null,
        createdAt: new Date("5-5-22"),
        updatedAt: new Date("5-5-22"),
      },
      {
        id: 47,
        name: "ktxc-06.jpg",
        zoning_id: 4,
        post_id: null,
        createdAt: new Date("5-5-22"),
        updatedAt: new Date("5-5-22"),
      },
      {
        id: 48,
        name: "khu-the-thao-01.jpg",
        zoning_id: 5,
        post_id: null,
        createdAt: new Date("8-11-22"),
        updatedAt: new Date("8-11-22"),
      },
      {
        id: 49,
        name: "khu-the-thao-02.jpg",
        zoning_id: 5,
        post_id: null,
        createdAt: new Date("8-11-22"),
        updatedAt: new Date("8-11-22"),
      },
      {
        id: 50,
        name: "khu-the-thao-03.jpg",
        zoning_id: 5,
        post_id: null,
        createdAt: new Date("8-11-22"),
        updatedAt: new Date("8-11-22"),
      },
      {
        id: 51,
        name: "khu-the-thao-04.jpg",
        zoning_id: 5,
        post_id: null,
        createdAt: new Date("8-11-22"),
        updatedAt: new Date("8-11-22"),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};