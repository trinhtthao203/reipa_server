/* eslint-disable import/no-anonymous-default-export */
// =============================================================================
// Lang for Vietnamese
// =============================================================================

export default {
    App: {
        TITLE: "Reipa"
    },
    Common: {
        MOMENT_DATE_FORMAT: "DD/MM/YYYY",
        MOMENT_DATETIME_FORMAT: "DD/MM/YYYY HH:mm",
        MOMENT_DATETIME_FORMAT2: "DD/MM/YYYY HH:mm:ss",
        MOMENT_DATETIME_FORMAT3: "DD/MM/YYYY HH:mm:ss.SSS",
        MOMENT_TIME_FORMAT: "HH:mm",
        MOMENT_TIME_FORMAT2: "HH:mm:ss",
        REQUIRE_TYPE_IMAGE: "Vui lòng chọn hình ảnh",
    },

    Message: {
        COMMON_ERROR: "Đã có lỗi xảy ra. Vui lòng thử lại",
        REQUEST_TIMEOUT: "Hết phiên nhập",
        REQUEST_401: "Unauthorized",
        REQUEST_403: "Forbidden",
        REQUEST_TIME_OUT: "Hết phiên đăng nhập vui lòng đăng nhập lại!",
        FEILD_REQUIRED_MESSAGE: "Vui lòng nhập các trường bắt buộc !",
        REQUIRED_IMAGES_MESSAGE: "Chưa có hình ảnh mô tả !",
        NOT_FOUND_MESSAGE: "Không tìm thấy dữ liệu",
        SUCCES_LOGIN_MESSAGE: "Đăng nhập thành công",
        PHONE_NUMBER_EXISTS_MESSAGE: "Số điện thoại tồn tại",
        POST_EXISTS_MESSAGE: "Tồn tại bài đăng. Vui lòng xóa bài đăng trước",
        ZONING_EXISTS_MESSAGE: "Tồn tại quy hoạch. Vui lòng xóa quy hoạch trước",
        PHONE_NUMBER_NOT_EXISTS_MESSAGE: "Số điện thoại không tồn tại",
        POST_NOT_EXISTS_MESSAGE: "Người dùng này không tồn tại bài đăng",
        ZONING_NOT_EXISTS_MESSAGE: "Người dùng này không tồn tại quy hoạch",
    },

    User: {
        REQUEST_ID_MESSAGE: "Vui lòng nhập mã tài khoản",
        ID_INCORRECT_MESSAGE: "Id tài khoản không tồn tại",
        PASSWORD_INCORRECT_MESSAGE: "Mật khẩu không đúng",
        PHONENUMBER_REQUIRED_MESSAGE: "Vui lòng nhập số điện thoại",
        PASSWORD_REQUIRED_MESSAGE: "Vui lòng nhập mật khẩu",
        PHONE_NUMBER_INCORRECT_MESSAGE: "Số điện thoại không đúng",
        SUCCESS_LOGIN_MESSAGE: "Đăng nhập thành công",
        DELETE_USER_REFUSE_MESSAGE: "Tài khoản Admin. Không được xóa",
        DELETE_USER_SUCCESS_MESSAGE: "Xóa người dùng thành công",
        DELETE_USER_NOT_SUCCESS_MESSAGE: "Xóa người dùng không thành công",
    },

    Register: {
        SUCCESS_REGISTER_MESSAGE: "Đăng ký thành công !",
        PHONE_NUMBER_EXISTS_MESSAGE: "Số điện thoại đã tồn tại !",
    },

    Provinces: {
        REQUEST_PROVINCE_ID: "Vui lòng chọn mã tỉnh",
        UPDATE_BORDER_PROVINCE_SUCCES: "Cập nhật ranh giới tỉnh thành công",
    },

    Districts: {
        REQUEST_DISTRICT_ID: "Vui lòng chọn mã quận/huyện",
    },

    Wards: {
        UPDATE_BORDER_WARD_SUCCES: "Cập nhật ranh giới phường/xã thành công",
        REQUEST_PROVINCE_MESSAGE: "Không tìm thấy mã tỉnh/thành phố ",
        REQUEST_DISTRICT_MESSAGE: "Không tìm thấy mã quận/huyện",
        REQUEST_WARD_MESSAGE: "Không tìm thấy mã xã/phường",
        NOT_CORRECT_WARD_MESSAGE: "Không tìm thấy mã xã/phường",
        CORRECT_WARD_MESSAGE: "Tìm thấy mã xã/phường",
        REQUEST_COORDINATES_MESSAGE: "Không tìm thấy tọa độ ranh giới phường/xã",
    },

    Zoning: {
        REQUEST_PROVINCE_ID_MESSAGE: "Không tìm thấy mã Tỉnh/Thành phố",
        ADD_SUCCESS_MESSAGE: "Tạo quy hoạch thành công",
        REQUEST_STATUSID_MESSAGE: "Vui lòng nhập mã trạng thái",
        REQUEST_POLYGONID_MESSAGE: "Vui lòng nhập mã vùng",
        REQUEST_POLYLINEID_MESSAGE: "Vui lòng nhập mã đường",
        REQUEST_LATLNG_MESSAGE: "Vui lòng nhập tọa độ",
        REQUEST_ID_MESSAGE: "Vui lòng nhập mã quy hoạch",
        REQUEST_USER_ID_MESSAGE: "Vui lòng nhập mã người dùng",
        DELETE_SUCCESS: "Xóa thành công"
    },

    Image: {
        REQUEST_ZONING_ID_MESSAGE: "Vui lòng nhập mã quy hoạch",
        REQUEST_POST_ID_MESSAGE: "Vui lòng nhập mã bài đăng"
    },

    Database: {
        ID: "id",
        PHONE_NUMBER: "phonenumber",
        PASSWORD: "password",
        FULL_NAME: "fullname",
        ADDRESS: "address",
        AVATAR: "avatar",
        STREET_ID: "street_id",
        WARD_ID: "ward_id",
        ROLE_ID: "role_id",
    },

    POST: {
        ADD_POST_SUCCESS: "Thêm bài đăng thành công",
        REQUEST_ID_MESSAGE: "Vui lòng nhập mã bài đăng",
        NOT_EXIST_ID_MESSAGE: "Mã bài đăng không tồn tại",
        REQUIRE_LATLNG_DISTANCE_MESSAGE: "Vui lòng nhập latlng và khoảng cách",
    }
}