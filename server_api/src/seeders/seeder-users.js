'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      phonenumber: "0986405456",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Quản lý",
      avatar: null,
      address: null,
      street_id: null,
      ward_id: null,
      avatar: null,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phonenumber: "0986405457",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Nhân viên",
      avatar: null,
      address: null,
      street_id: null,
      ward_id: null,
      avatar: null,
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phonenumber: "0369369369",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Trịnh Thị Thanh Trúc",
      avatar: null,
      address: "1/1",
      street_id: null,
      ward_id: null,
      avatar: null,
      role_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};