const DOMAIN = process.env.REACT_APP_BASE_URL;

const Constants = {
    Api: {
        BASE_URL: `${DOMAIN}/api`,
        BASE_IMAGES: `${DOMAIN}/images`,
        BASE_FILES: `${DOMAIN}/files`,
        TIMEOUT: 25 * 1000,
    },

    /**
     * Return code from Api
     */
    ApiCode: {
        // Code from server api
        SUCCESS: 200,
        BAD_REQUEST: 400,
        INTERNAL_SERVER_ERROR: 500,

        // Code from local app
        CONNECTION_TIMEOUT: "CONNECTION_TIMEOUT",
        INTERNAL_SERVER: "INTERNAL_SERVER",
        UNKNOWN_NETWORK: "UNKNOWN_NETWORK",
    },

    ApiPath: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        ALL_USER: "/user/get-all",
        ALL_ROLE: "/roles/get-all",

        UPDATE_USER: "/user/update",
        USER_BY_ID: "/user/get-by-id",

        DELETE_USER: "/user/delete",
        GET_PROVINCE_LIST: "/provinces/get-all",
        GET_DISTRICT_LIST: "/districts/get-all",
        GET_DISTRICT_BYPROVINCE: "/districts/get-by-province",
        GET_WARD_LIST: "/wards/get-all",
        GET_WARD_BY_DISTRICT_PROVINCE: "/wards/get-by-province-district-id",
        GET_STREET_LIST: "/streets/get-all",
        GET_STREET_BY_DISTRICT_PROVINCE: "/streets/get-by-province-district-id",

        ZONING_GET_ALL: "/zoning/get_all",
        ZONING_DELETE: "/zoning/delete_zonings",
        ZONING_BY_ID: "/zoning/get_by_id",
        ZONING_UPDATE_STATUS: "/zoning/update_status",

        POST_GET_ALL: "/post/get_all",

        STATUS_GET_ALL: "/status/get-all",

        IMAGE_BY_ZONING: "/images/get_all_by_zoning_id",
        IMAGE_BY_POST: "/images/get_all_by_post_id",
    },

    /**
     * Styles for app.
     *
     * Color refer
     * @see https://www.rapidtables.com/web/color/index.html
     * @see https://www.w3schools.com/w3css/w3css_colors.asp
     */
    Styles: {
        // =====================================================================
        // Common color
        // =====================================================================
        SIZE_AVATAR: 60,

        COLOR_CHETWODE_BLUE: "#878DE1",
        COLOR_AMBER: "#F7C005",
        COLOR_ATHENSGRAY: "#F2F2F2",
        COLOR_DARKGRAY: "#b2bec3",
        COLOR_GHOST: "#737373",
        COLOR_BLACK: "#201E11",
        CORLOR_WHITE: "#FFFFFF",
        CORLOR_ERROR: "#ED4337",

        // =====================================================================
        // Common size
        // =====================================================================
        AVATAR_SIZE: "80px",
        DEFAULT_FONTSIZE: "16px",
        DEFAULT_SPACING: "24px",

        // =====================================================================
        // Font size
        // =====================================================================
        FONT_SIZE_SMALL: 13,
        FONT_SIZE_DEFAULT: 15,
        FONT_SIZE_MEDIUM: 17,
        FONT_SIZE_LARGE: 23,
        FONT_SIZE_XLARGE: 27,
        FONT_SIZE_XXLARGE: 31,

        CARD_BORDER_RADIUS: 3,
        BOX_BORDER_RADIUS: 6,
        BOX_SHADOW: 3,
    },

    /**
     * Regex Expression
     */
    RegExp: {
        EMAIL_ADDRESS: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        PASSWORD: new RegExp(`/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/`),
        PHONE_NUMBER: new RegExp(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/),
    },
    /**
     * Storage keys
     */
    StorageKeys: {
        ACCESS_TOKEN: "ACCESS_TOKEN",
        USER_INFO: "USER_INFO",
    },

    DefaultLanguage: "vi",

    COCCOC_BRAND_NAME: "CocCoc"
};

export default Constants;