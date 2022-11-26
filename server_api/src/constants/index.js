const DOMAIN = process.env.REACT_APP_BASE_URL;

const Constants = {
    Api: {
        BASE_URL: `${DOMAIN}/api`,
        TIMEOUT: 25 * 1000,
        EXPIRES_IN: "3h",
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

        // User report
        USER_REPORT_CREATE: "userReport/create",
        USER_REPORT_UPDATE: "userReport/update",
        USER_REPORT_TOTAL_TIME: "/userReport/total",
        FILTER_USER_REPORT: "/userReport/filter",
        DELETE_USER_REPORT: "/userReport/delete",

        // Absence
        LIST_ABSENCE: "absence/list",
        CREATE_ABSENCE: "absence/create",
        UPDATE_ABSENCE: "absence/update",
        DELETE_ABSENCE: "absence/delete",
        FILTER_ABSENCE: "absence/filter",

        // Acccount
        GET_USER_SETTING: "userSetting/get",
        LIST_TEAM: "team/list",
        LIST_ORGANIZATION: "organization/list",
    },

    /**
     * Regex Expression
     */
    RegExp: {
        /** https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */
        EMAIL_ADDRESS: new RegExp(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@`
            + `((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`),
        NEW_EMAIL_ADDRESS: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        /** https://gist.github.com/HarishChaudhari/0dd5514ce430991a1b1b8fa04e8b72a4 */
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

    COCCOC_BRAND_NAME: "CocCoc",
};

export default Constants;
