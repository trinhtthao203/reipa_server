'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      phonenumber: "0986405456",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Quản lý",
      avatar: "admin.jpg",
      address: null,
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
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phonenumber: "0369369369",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Trịnh Thị Thanh Trúc",
      avatar: "avatar-nu-00.jpg",
      address: "Thạnh Mỹ Tây, Châu Phú, An Giang",
      role_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phonenumber: "0363308468",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Phạm Thế Trường",
      avatar: "avatar-01.jpg",
      address: "Ninh Kiều, Cần Thơ",
      role_id: 3,
      createdAt: new Date("2-2-22"),
      updatedAt: new Date("2-2-22")
    },
    {
      phonenumber: "0975980440",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Nguyễn Hoài An",
      avatar: "avatar-02.jpg",
      address: null,
      role_id: 3,
      createdAt: new Date("1-24-22"),
      updatedAt: new Date("1-24-22")
    },
    {
      phonenumber: "0376020797",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Lâm Thị Khả Hân",
      avatar: "avatar-03.jpg",
      address: "Bình Thủy, Cần Thơ",
      role_id: 3,
      createdAt: new Date("2-24-22"),
      updatedAt: new Date("2-24-22")
    },
    {
      phonenumber: "0978595764",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Phan Minh Nam",
      avatar: "avatar-04.jpg",
      address: "Châu Thành, Bến Tre",
      role_id: 3,
      createdAt: new Date("1-4-22"),
      updatedAt: new Date("1-4-22")
    },
    {
      phonenumber: "0368120791",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Phan Xuân Hiếu",
      avatar: "avatar-nam-08.jpg",
      address: "TP Hồ Chí Minh",
      role_id: 3,
      createdAt: new Date("7-7-22"),
      updatedAt: new Date("7-7-22")
    },
    {
      phonenumber: "0337215005",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Trần Bảo Nam",
      avatar: "avatar-nam-09.jpg",
      address: "Cần Thơ",
      role_id: 3,
      createdAt: new Date("7-17-22"),
      updatedAt: new Date("7-17-22")
    },
    {
      phonenumber: "0362155499",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Phạm An Ngọc",
      avatar: "avatar-nu-06.jpg",
      address: "Mỹ Khánh, Long Xuyên, An Giang",
      role_id: 3,
      createdAt: new Date("7-17-22"),
      updatedAt: new Date("7-17-22")
    },
    {
      phonenumber: "0386388479",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Mai An Nhiên",
      avatar: "avatar-05.jpg",
      address: "Cô Tô, Quảng Ninh",
      role_id: 3,
      createdAt: new Date("7-12-22"),
      updatedAt: new Date("7-12-22")
    },
    {
      phonenumber: "0357729468",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Phan Quỳnh Anh",
      avatar: "avatar-nu-07.jpg",
      address: "Kiên Lương, Kiên Giang",
      role_id: 3,
      createdAt: new Date("3-20-22"),
      updatedAt: new Date("3-20-22")
    },
    {
      phonenumber: "0329469166",
      password: "$2a$10$90d9IsOKREre.4/0ZnonUOjKqQ/g/h.rl48EXK8SOHlu8xdmUN37m",
      fullname: "Đỗ Khôi Vĩ",
      avatar: "avatar-nam-10.jpg",
      address: "Hòa Bình, Bạc Liêu",
      role_id: 3,
      createdAt: new Date("7-20-22"),
      updatedAt: new Date("7-20-22")
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};