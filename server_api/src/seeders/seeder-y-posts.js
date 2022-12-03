'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        id: 1,
        title: "Bán nhà 3 lầu hẻm 22 Trần Hoàng Na giá 4,65 triệu",
        price: 49.47,
        area: 94,
        address: "hẻm 22 Trần Hoàng Na, Phường Hưng Lợi, Quận Ninh Kiều, Cần Thơ",
        structure: 3,
        bedroom: 7,
        toilet: 3,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.764384,
            10.011797
          ]
        })),
        user_id: 3,
        furniture_id: 3,
        juridical_id: 1,
        province_id: 20,
        district_id: 180,
        ward_id: 2373,
        street_id: null,
        typeof_real_estate_id: 2,
        typeof_posts_id: 1,
        description: "BÁN NHÀ HẺM 22 TRẦN HOÀNG NA ( chủ gửi)( CÁCH ĐƯỜNG TRẦN HOÀNG NA CHỈ 20m)- Vị trí: Nằm trục hẻm 22 Trần Hoàng Na đã nâng cấp lộ trước nhà 6m5 cao ráo, sạch sẽ cách đường Trần Hoàng Na chỉ 80m. DT: 4m x 22m = 94m2. DTSD: 235,2m2. Thổ cư hoàn công. Kết cấu : 1 trệt 2 lầu bao gồm 1 phòng khách 7 phòng ngủ bếp 3 nhà vệ sinh, sân đậu xe rộng rãi. Cửa chính và cửa phòng ngủ sử dụng cửa gỗ cao cấp,cầu thang lót đá granite . Trang bị sẵn tủ bếp gỗ.",
        status_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Đất Nền Vạn Phát Sông Hậu - Đầu Tư Sinh Lợi",
        price: 8.75,
        area: 80,
        address: "Nguyễn Văn Linh, Phường Hưng Lợi, Quận Ninh Kiều, Cần Thơ",
        structure: 0,
        bedroom: 0,
        toilet: 0,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.769946,
            10.064138
          ]
        })),
        user_id: 3,
        furniture_id: 1,
        juridical_id: 2,
        province_id: 20,
        district_id: 180,
        ward_id: 2338,
        street_id: null,
        typeof_real_estate_id: 6,
        typeof_posts_id: 1,
        description: "🏝 VẠN PHÁT SÔNG HẬU - CÔNG CHỨNG LIỀN TAY - NHẬN NGAY GIÁ TRỊ 🏝<br>🅰️ Nền trục phụ 80m2 giá từ 7️⃣0️⃣0️⃣tr/ Nền.<br>🅱️ Nền trục chính 100m2 giá 1️⃣1️⃣5️⃣0️⃣ tr/ Nền.<br>🅾️ Nền sát bên công viên giá 8️⃣0️⃣0️⃣ tr/ Nền.<br>➡️ Nền đối diện trường học giá 8️⃣ 6️⃣ 0️⃣tr/ Nền.<br>🌋 CSHT hiện hoàn thiện 90% hiện dân cư đã vào xây dựng,,<br>• Lộ 14m, 26m đường băng cất cánh<br>• Nội khu: Trường mầm non, TRUNG TÂM THƯƠNG MẠI, Chợ nông sản. BẾN DU THUYỀN,",
        status_id: 2,
        createdAt: new Date("5-1-22"),
        updatedAt: new Date("5-1-22")
      },
      {
        id: 3,
        title: "CHO THUÊ NHÀ TRỆT 58M2 GẦN THÀNH ĐẠT HOA VIÊN GIÁ RẺ",
        price: 7,
        area: 57.5,
        address: "Nguyễn Văn Cừ Nd, Phường An Khánh, Quận Ninh Kiều, Cần Thơ",
        structure: 0,
        bedroom: 1,
        toilet: 1,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.661057,
            9.991538
          ]
        })),
        user_id: 4,
        furniture_id: 3,
        juridical_id: 5,
        province_id: 20,
        district_id: 181,
        ward_id: 2379,
        street_id: null,
        typeof_real_estate_id: 2,
        typeof_posts_id: 3,
        description: "NHÀ TRỆT 57,5M2 GẦN HOA VIÊN THÀNH ĐẠT<br>=====<br>- Hẻm Lò Mổ gần Hoa Viên Thành Đạt, P.An Khánh, Q.Ninh Kiều, Tp.Cần Thơ<br>- DT: 5 x 11,5 = 57,5 m2 (40m2 thổ cư, 17,5m2 CLN)<br>- Kết cấu: 1PK, 1PN, nhà bếp, WC<br>- Lộ giới: 2m cách hẻm lò mổ 40m gần trường đại học y dược và đại học Cần Thơ thuận tiện cho gia đình trẻ và con e đi học<br>- Hướng: Đông Nam",
        status_id: 2,
        createdAt: new Date("5-7-22"),
        updatedAt: new Date("5-7-22")
      },
      {
        id: 4,
        title: "Cần mua cửa hàng mặt bằng bán hải sản trên đường 30/4",
        price: 8,
        area: 30,
        address: "30/4, Quận Ninh Kiều, Cần Thơ",
        structure: 0,
        bedroom: 1,
        toilet: 1,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.771508,
            10.022598
          ]
        })),
        user_id: 4,
        furniture_id: 3,
        juridical_id: 1,
        province_id: 20,
        district_id: 180,
        ward_id: 2376,
        street_id: null,
        typeof_real_estate_id: 9,
        typeof_posts_id: 2,
        description: "Cần gấp. Giá cả thương lượng",
        status_id: 2,
        createdAt: new Date("5-8-22"),
        updatedAt: new Date("5-8-22")
      },
      {
        id: 5,
        title: "Cho thuê trọ sinh viên",
        price: 1,
        area: 5,
        address: "30/4, Quận Ninh Kiều, Cần Thơ",
        structure: 0,
        bedroom: 1,
        toilet: 1,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.77081,
            10.021932
          ]
        })),
        user_id: 5,
        furniture_id: 2,
        juridical_id: 5,
        province_id: 20,
        district_id: 180,
        ward_id: 2376,
        street_id: null,
        typeof_real_estate_id: 8,
        typeof_posts_id: 3,
        description: "Cho thuê trọ giá sinh viên, sạch sẽ, mới xây",
        status_id: 2,
        createdAt: new Date("5-8-22"),
        updatedAt: new Date("5-8-22")
      },
      {
        id: 6,
        title: "cần thuê mặt bằng",
        price: 10,
        area: 32,
        address: "Nguyễn Văn Linh, Quận Ninh Kiều, Cần Thơ",
        structure: 0,
        bedroom: 0,
        toilet: 0,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.766031,
            10.02104
          ]
        })),
        user_id: 4,
        furniture_id: 3,
        juridical_id: 5,
        province_id: 20,
        district_id: 180,
        ward_id: 2376,
        street_id: null,
        typeof_real_estate_id: 9,
        typeof_posts_id: 4,
        description: "Cần gấp. Giá cả thương lượng",
        status_id: 2,
        createdAt: new Date("10-10-22"),
        updatedAt: new Date("10-10-22")
      },
      {
        id: 7,
        title: "Bán đất nền trung tâm Cần Thơ",
        price: 95,
        area: 40,
        address: "3/2, Quận Ninh Kiều, Cần Thơ",
        structure: 0,
        bedroom: 0,
        toilet: 0,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.764609,
            10.023899
          ]
        })),
        user_id: 7,
        furniture_id: 1,
        juridical_id: 1,
        province_id: 20,
        district_id: 180,
        ward_id: 2376,
        street_id: null,
        typeof_real_estate_id: 6,
        typeof_posts_id: 1,
        description: "Bán gấp. Giá cả thương lượng",
        status_id: 2,
        createdAt: new Date("5-22-22"),
        updatedAt: new Date("5-22-22")
      },
      {
        id: 8,
        title: "Bán nhà 1 lầu 2 phòng ngủ ở Ô Môn",
        price: 55,
        area: 45,
        address: "Ô Môn, Cần Thơ",
        structure: 0,
        bedroom: 2,
        toilet: 1,
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Point",
          "coordinates": [
            105.771508,
            10.022598
          ]
        })),
        user_id: 4,
        furniture_id: 3,
        juridical_id: 2,
        province_id: 20,
        district_id: 180,
        ward_id: 2366,
        street_id: null,
        typeof_real_estate_id: 2,
        typeof_posts_id: 1,
        description: "Bán gấp. Giá cả thương lượng",
        status_id: 2,
        createdAt: new Date("5-10-22"),
        updatedAt: new Date("5-10-22")
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};