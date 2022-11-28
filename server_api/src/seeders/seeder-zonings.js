'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Zonings', [
      {
        id: 1,
        name: "Chung Cư Cadif Cần Thơ Quận Cái Răng",
        purpose: "Đất phức hợp",
        area: 1125.5,
        width: 0,
        length: 0,
        address: "đường A1, Quận Cái Răng, Phường Hưng Phú, Cần Thơ",
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.786995,
                10.019878
              ],
              [
                105.786909,
                10.019984
              ],
              [
                105.786861,
                10.020026
              ],
              [
                105.78648,
                10.019714
              ],
              [
                105.786582,
                10.019582
              ],
              [
                105.786995,
                10.019878
              ]
            ]
          ]
        })),
        ispolygon: true,
        description: "Chung cư Cadif là dự án của Công ty cổ phần đầu tư Cadif, các căn hộ tại dự án này chỉ được bán sau khi đã thi công hoàn thiện hoàn toàn. Nhờ vậy, khách hàng có thể trực tiếp xem mẫu nhà thực tế để lựa chọn, tạo độ uy tín cao.Dự án chia thành 2 tòa: tòa A và tòa B. Tòa A là chung cư cho các gia đình trẻ, với hệ thống thang máy rộng - tiện lợi. Tòa B là các căn nhà phố liền kề để làm văn phòng hoặc kinh doanh. Dự án Cadif Cần Thơ với rất nhiều ưu điểm nổi bật, cùng hàng loạt tiện ích ấn tượng chắc chắn sẽ là lựa chọn hàng đầu cho các khách hàng.1. Vị trí dự án nằm ngay tại đường A1, gần rất nhiều cung đường lớn, tiện cho việc đi lại.2. Xung quanh dự án có hàng loạt các tiện ích về trường học, thương mại, chợ, bệnh viện... thuận tiện cho cư dân.3. Đa dạng loại hình: từ căn hộ chung cư đến nhà phố cho khách hàng lựa chọn theo đặc điểm và nhu cầu sử dụng.4. Được đầu tư đầy đủ với camera an ninh, thang máy tốc độ cao, khóa điện tử thông minh.5. Bán sau khi đã hoàn thiện giúp khách hàng quan sát thực tế, dễ dàng đánh giá để đưa ra quyết định lựa chọn phù hợp.",
        province_id: 20,
        district_id: 178,
        ward_id: 2345,
        user_id: 3,
        typeof_zoning_id: 3,
        status_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Công viên Enriser",
        purpose: "Đất phức hợp",
        area: 22051.3,
        width: 0,
        length: 0,
        address: "đường A1, Quận Cái Răng, Phường Hưng Phú, Cần Thơ",
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.761391,
                10.024501
              ],
              [
                105.762663,
                10.02366
              ],
              [
                105.762974,
                10.024136
              ],
              [
                105.763184,
                10.024421
              ],
              [
                105.763345,
                10.02467
              ],
              [
                105.762094,
                10.025462
              ],
              [
                105.761391,
                10.024501
              ]
            ]
          ]
        })),
        ispolygon: true,
        description: "Theo đồ án điều chỉnh Quy hoạch chung xây dựng TP. Cần Thơ đến năm 2025 do Thủ tướng Chính phủ phê duyệt tại quyết định số 24/QĐ-TTg ngày 06.01.2010, tổng diện tích cây xanh theo quy hoạch được duyệt trên toàn thành phố khoảng 6.259ha, tương ứng với chỉ tiêu quy hoạch đất cây xanh khoảng 6,3m2/người, trong khi thực tế hiện nay, chỉ tiêu cây xanh công cộng tại thành phố chỉ đạt mức bình quân là 1,6m2/người(*), khá thấp so với tiêu chuẩn chung của một thành phố hiện đại – văn minh và còn thấp xa so với quy hoạch được phê duyệt.Vì vậy cần khẩn trương mở rộng các khoảng xanh giữa lòng thành phố",
        province_id: 20,
        district_id: 178,
        ward_id: 2345,
        user_id: 3,
        typeof_zoning_id: 3,
        status_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Mở rộng đường hẻm 51",
        purpose: "Đất giao thông",
        area: 0,
        width: 5,
        length: 1190,
        address: "hẻm 51, Quận Ninh Kiều, Cần Thơ",
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "LineString",
          "coordinates": [
            [
              105.767471,
              10.024753
            ],
            [
              105.767288,
              10.024975
            ],
            [
              105.766838,
              10.025398
            ],
            [
              105.766677,
              10.025186
            ],
            [
              105.766495,
              10.025429
            ],
            [
              105.766366,
              10.025429
            ],
            [
              105.765218,
              10.02637
            ],
            [
              105.76495,
              10.026508
            ],
            [
              105.763781,
              10.027406
            ],
            [
              105.763406,
              10.027881
            ],
            [
              105.762714,
              10.028901
            ],
            [
              105.761974,
              10.029562
            ],
            [
              105.761883,
              10.029757
            ],
            [
              105.761883,
              10.0299
            ],
            [
              105.762258,
              10.031168
            ],
            [
              105.762489,
              10.031691
            ],
            [
              105.763025,
              10.032319
            ]
          ]
        })),
        ispolygon: false,
        description: "Theo đồ án điều chỉnh Quy hoạch chung xây dựng TP. Cần Thơ đến năm 2025 do Thủ tướng Chính phủ phê duyệt tại quyết định số 24/QĐ-TTg ngày 06.01.2010, tổng diện tích cây xanh theo quy hoạch được duyệt trên toàn thành phố khoảng 6.259ha, tương ứng với chỉ tiêu quy hoạch đất cây xanh khoảng 6,3m2/người, trong khi thực tế hiện nay, chỉ tiêu cây xanh công cộng tại thành phố chỉ đạt mức bình quân là 1,6m2/người(*), khá thấp so với tiêu chuẩn chung của một thành phố hiện đại – văn minh và còn thấp xa so với quy hoạch được phê duyệt.Vì vậy cần khẩn trương mở rộng các khoảng xanh giữa lòng thành phố",
        province_id: 20,
        district_id: 178,
        ward_id: null,
        user_id: 3,
        typeof_zoning_id: 2,
        status_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Kí túc xá C Đại học Cần Thơ",
        purpose: "Đất phức hợp",
        area: 0,
        width: 5,
        length: 1190,
        address: "Nguyễn Văn Trỗi, Quận Ninh Kiều, Cần Thơ",
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.769822,
                10.037125
              ],
              [
                105.769688,
                10.037337
              ],
              [
                105.769479,
                10.037564
              ],
              [
                105.769324,
                10.037712
              ],
              [
                105.769163,
                10.037606
              ],
              [
                105.769822,
                10.037125
              ]
            ]
          ]
        })),
        ispolygon: true,
        description: "Theo đồ án điều chỉnh Quy hoạch chung xây dựng TP. Cần Thơ đến năm 2025 do Thủ tướng Chính phủ phê duyệt tại quyết định số 24/QĐ-TTg ngày 06.01.2010, tổng diện tích cây xanh theo quy hoạch được duyệt trên toàn thành phố khoảng 6.259ha, tương ứng với chỉ tiêu quy hoạch đất cây xanh khoảng 6,3m2/người, trong khi thực tế hiện nay, chỉ tiêu cây xanh công cộng tại thành phố chỉ đạt mức bình quân là 1,6m2/người(*), khá thấp so với tiêu chuẩn chung của một thành phố hiện đại – văn minh và còn thấp xa so với quy hoạch được phê duyệt.Vì vậy cần khẩn trương mở rộng các khoảng xanh giữa lòng thành phố",
        province_id: 20,
        district_id: 178,
        ward_id: 2376,
        user_id: 4,
        typeof_zoning_id: 3,
        status_id: 2,
        createdAt: new Date("8-11-22"),
        updatedAt: new Date("8-11-22")
      },
      {
        id: 5,
        name: "KHU THỂ THAO CẦN THƠ",
        purpose: "Đất phức hợp",
        area: 381.2,
        width: 0,
        length: 0,
        address: "An Nghiệp, Cần Thơ",
        geometry: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify({
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.774843,
                10.039106
              ],
              [
                105.774801,
                10.039016
              ],
              [
                105.774865,
                10.038905
              ],
              [
                105.774972,
                10.038932
              ],
              [
                105.77502,
                10.039053
              ],
              [
                105.774935,
                10.039111
              ],
              [
                105.774843,
                10.039106
              ]
            ]
          ]
        })),
        ispolygon: true,
        description: "Theo đồ án điều chỉnh Quy hoạch chung xây dựng TP. Cần Thơ đến năm 2025 do Thủ tướng Chính phủ phê duyệt tại quyết định số 24/QĐ-TTg ngày 06.01.2010, tổng diện tích cây xanh theo quy hoạch được duyệt trên toàn thành phố khoảng 6.259ha, tương ứng với chỉ tiêu quy hoạch đất cây xanh khoảng 6,3m2/người, trong khi thực tế hiện nay, chỉ tiêu cây xanh công cộng tại thành phố chỉ đạt mức bình quân là 1,6m2/người(*), khá thấp so với tiêu chuẩn chung của một thành phố hiện đại – văn minh và còn thấp xa so với quy hoạch được phê duyệt.Vì vậy cần khẩn trương mở rộng các khoảng xanh giữa lòng thành phố",
        province_id: 20,
        district_id: 178,
        ward_id: 2371,
        user_id: 4,
        typeof_zoning_id: 3,
        status_id: 2,
        createdAt: new Date("8-11-22"),
        updatedAt: new Date("8-11-22")
      },

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Zonings', null, {});
  }
};