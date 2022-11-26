import Constants from '../constants'
import Strings from '../constants/strings'
import Screens from '../constants/screens'

/**
 * Helpers.ts
 *
 * Common function for app.
 */
const Helpers = {
    /**
     * Check value is string or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is string true. Otherwise it returns false.
     */
    isString: (value) => {
        return typeof value === 'string'
    },

    /**
     * Check value is object or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is object true. Otherwise it returns false.
     */
    isObject: (value) => {
        return typeof value === 'object'
    },

    /**
     * Determine if the argument passed is a JavaScript function object.
     *
     * @param {any} obj: Object to test whether or not it is an array.
     * @returns {boolean} returns a Boolean indicating whether the object is a JavaScript function
     */
    isFunction: (value) => {
        return typeof value === 'function'
    },

    /**
     * Check a value is number or non, if number then return true, otherwise return false.
     *
     * @param {string} value: Value can check number
     * @returns {boolean} if number then return true, otherwise return false.
     */
    isNumber: (value) => {
        return typeof value === 'number'
    },

    /**
     * Check a value is NaN or not
     *
     * @param {any} value: Value can check number
     * @returns {boolean} if NaN then return true, otherwise return false.
     */
    isNaN: (value) => {
        return isNaN(value)
    },

    /**
     * Check Object is null or String null or empty.
     *
     * @param {object | string} value Object or String
     * @returns {boolean} if null or empty return true, otherwise return false.
     */
    isNullOrEmpty: (value) => {
        return value === undefined || value === null || value === ''
    },

    isObjectEmpty: (value) => {
        return Object.keys(value).length === 0
    },

    /**
     * Trim space character (start, end) of input string.
     *
     * @param {string} value: Value for trim
     * @returns {string} String after trim, space start & end is removed
     */
    trim: (value) => {
        return Helpers.isString(value) ? value.trim() : ''
    },

    /**
     * If value is string return value, otherwise return value.toString
     *
     * @param {string} value: Value
     * @returns {string} String or convert of value to string
     */
    ensureString: (value) => {
        try {
            if (!Helpers.isNullOrEmpty(value)) {
                if (Helpers.isString(value)) {
                    return value
                } else if (Helpers.isObject(value)) {
                    return JSON.stringify(value)
                } else {
                    return `${value}`
                }
            }
        } catch (error) {
            return ''
        }
        return ''
    },

    /**
     * Convert size in bytes to KB, MB, GB or TB
     *
     * @param {number} bytes: Size convert
     * @returns {string} Value formatted include unit.
     */
    bytesToSize: (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (Helpers.isNullOrEmpty(bytes) || bytes === 0) {
            return '0 Byte'
        }
        const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)))
        return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`
    },

    /**
     * Convert date to string with custom format.
     *
     * @param {number | Date} date Date or Timestamp
     * @param {string} format Format string output
     */
    // dateToString: (date, format) => {
    //   if (Helpers.isNullOrEmpty(date)) {
    //     return "";
    //   } else if (Helpers.isNumber(date) && (`${date}`.length === 10)) {
    //     return moment.unix(date).format(format);
    //   } else {
    //     return moment(date).format(format);
    //   }
    // },

    /**
     * Convert string to date.
     *
     * @param {string} dateString string
     */
    stringToDate: (dateString) => {
        return new Date(dateString)
    },

    /**
     * Convert string to hex color code.
     *
     * @param {string} inputString string
     */
    stringToColor: (inputString) => {
        let hash = 0
        for (let i = 0; i < inputString.length; i++) {
            hash = inputString.charCodeAt(i) + ((hash << 5) - hash)
        }

        let color = '#'
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff
            color += ('00' + value.toString(16)).substr(-2)
        }

        return color
    },

    /**
     * Convert date to unix time.
     *
     * @param {Date} date Date
     */
    // dateToUnixTime: (date) => {
    //   if (!Helpers.isNullOrEmpty(date)) {
    //     return moment(date).unix();
    //   }
    //   return 0;
    // },

    firstDayOfMonthUnixTime: (date) => {
        let dateNow = new Date()
        if (!Helpers.isNullOrEmpty(date)) {
            dateNow = date
        }

        const firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).getTime() / 1000

        return firstDay
    },

    lastDayOfMonthUnixTime: (date) => {
        let dateNow = new Date()
        if (!Helpers.isNullOrEmpty(date)) {
            dateNow = date
        }

        const lastDay = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getTime() / 1000

        return lastDay
    },

    // fromNow: (date) => {
    //   return moment(date).fromNow();
    // },

    /**
     * Get protocal from url.
     * e.g. URL is https://google.com, protocal output is [https:]
     *
     * @param {string} url URL
     * @returns {string} Protocal of URL, if not a URL return empty string
     */
    getProtocolFromURL: (url) => {
        const urlTrim = Helpers.trim(url)
        const index = urlTrim.indexOf('//')
        if (index > -1) {
            return urlTrim.substring(0, index)
        }
        return ''
    },

    /**
     * Format numbers with leading zeros
     *
     * @param {number} num A number
     * @param {number} size Sring output length
     * @returns {string} String format with leading zero
     */
    zeroPad: (num, size) => {
        let result = `${num}`
        while (result.length < size) {
            result = '0' + result
        }
        return result
    },

    /**
     * Copy object properties to another object
     *
     * @param {any} sourceObj Object
     * @param {any} distObj Object
     */
    copyProperties: (sourceObj, distObj) => {
        for (const key in sourceObj) {
            if (!sourceObj.hasOwnProperty(key)) {
                continue
            }
            const sourceObjData = sourceObj[key]
            if (!Helpers.isNullOrEmpty(sourceObjData)) {
                if (Array.isArray(sourceObjData)) {
                    const distObjData = []
                    Helpers.copyProperties(sourceObjData, distObjData)
                    distObj[key] = distObjData
                    continue
                }
                if (Helpers.isObject(sourceObjData)) {
                    const distObjData = {}
                    Helpers.copyProperties(sourceObjData, distObjData)
                    distObj[key] = distObjData
                    continue
                }
            }
            distObj[key] = sourceObjData
        }
    },

    getTitle: (pathName) => {
        let title = ''
        const screens = [
            {
                name: Strings.Common.HOME,
                path: '/',
            },
            {
                name: Strings.Common.HOME,
                path: Screens.HOME,
            },
            {
                name: 'Thêm mới người dùng',
                path: Screens.CREATE_USER,
            },
            {
                name: 'Cập nhật người dùng',
                path: Screens.UPDATE_USER,
            },
        ]

        screens.forEach((screen) => {
            if (pathName.includes(screen.path)) {
                title = screen.name
            }
        })

        return title
    },

    getBase64: (file, callback) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            let result = reader.result
            if (Helpers.isString(reader.result)) {
                const base64Data = reader.result.split(',')
                result = base64Data.length > 0 ? base64Data[1] : ''
            }
            console.log('getBase64', result)
            callback(result)
        }
        reader.onerror = (error) => {
            console.log('Error: ', error)
        }
    },

    getCharacterAvatar: (fullName) => {
        if (!fullName) {
            return ''
        }
        const itemNames = fullName.split(' ').filter((value) => {
            return value.trim().length > 0
        })
        let fName = ''
        if (itemNames.length >= 2) {
            for (let i = itemNames.length - 2; i < itemNames.length; i++) {
                if (itemNames[i].length > 0) {
                    fName = fName + itemNames[i].substring(0, 1).toUpperCase()
                }
            }
        } else {
            fName = itemNames[0].substring(0, 1).toUpperCase()
        }
        return fName
    },

    getFileExtension: (fullFileName) => {
        if (!Helpers.isNullOrEmpty(fullFileName)) {
            const length = fullFileName.length
            const extension = fullFileName.slice(fullFileName.lastIndexOf('.') + 1, length)
            return extension.toLowerCase()
        } else {
            return ''
        }
    },

    readFileAsArrayBuffer: (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()

            reader.onerror = (event) => {
                reject(event)
            }

            reader.onload = function (event) {
                const arrayBuffer = new Uint8Array(reader.result)
                resolve(arrayBuffer)
            }

            reader.readAsArrayBuffer(file)
        })
    },

    isCocCoc: () => {
        const thisWindow = window
        const brands = thisWindow?.navigator?.userAgentData?.brands || []
        const indexOfCocCoc = brands?.findIndex((item) => item.brand === Constants.COCCOC_BRAND_NAME)
        return indexOfCocCoc !== -1
    },

    isLoggedIn: () => {
        return sessionStorage.getItem(Constants.StorageKeys.ACCESS_TOKEN) !== null
    },

    // formatDate: (value, format) => {
    //   const result = value ? moment(value).local().format(format || "DD/MM/YYYY") : "";
    //   return result;
    // },

    formatDateName: (date) => {
        let name = ''
        try {
            if (typeof Intl === 'undefined') {
                require('intl')
                require('intl/locale-data/jsonp/vi')
            }
            const options = { weekday: 'long' }
            name = new Intl.DateTimeFormat('vi-VN', options).format(date)
        } catch (error) {
            console.log('formatDateName', error)
        }
        return name
    },

    formatTime: (date) => {
        let h = ''
        let m = ''
        let s = ''
        if (date) {
            if (Helpers.isNumber(date)) {
                h = '' + new Date(date).getHours()
                m = '' + new Date(date).getMinutes()
                s = '' + new Date(date).getSeconds()
            } else {
                h = '' + date.getHours()
                m = '' + date.getMinutes()
                s = '' + date.getSeconds()
            }
            if (h.length < 2) {
                h = '0' + h
            }
            if (m.length < 2) {
                m = '0' + m
            }
            if (s.length < 2) {
                s = '0' + s
            }
            // return h + ":" + m + ":" + s;
            return h + ':' + m
        }
        return ''
    },

    // stringToHTML: (text) => {
    //   return parse(text);
    // },
    formatDateForInput: (date) => {
        var d = date ? new Date(date) : new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    },
    formatDateFromString: (
        dateString = '',
        options = {
            weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        },
    ) => {
        var date = new Date(dateString)
        const language = localStorage.getItem(Constants.StorageKeys.LANGUAGE)
        if (language) return date.toLocaleDateString(language, options)
        return date.toLocaleDateString(Constants.DefaultLanguage, options)
    },
    /**
     * @param {string} str
     * @returns {string}
     */
    toSlug: (str) => {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase()

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
        str = str.replace(/(đ)/g, 'd')

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '')

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-')

        // Xóa ký tự - liên tiếp
        str = str.replace(/-+/g, '-')

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '')

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '')

        // return
        return str
    },
    /**
     * @param {object} prop
     * @param {keyof object} value
     * @returns {string}
     */
    propName: function propName(prop, value) {
        for (var i in prop) {
            if (typeof prop[i] == 'object') {
                if (propName(prop[i], value)) {
                    return propName(prop[i], value)
                }
            } else {
                if (prop[i] == value) {
                    return i
                }
            }
        }
        return undefined
    },
    /**
     *
     * @param {string} input
     * @returns {string}
     */
    htmlDecode: (input) => {
        if (!input) return
        var doc = new DOMParser().parseFromString(input, 'text/html')
        return doc.documentElement.textContent
    },
    /**
     *
     * @param {string} str
     * @param {number} len
     * @returns {string}
     */
    trimString: (str, len) => {
        if (!str || len < 5) return
        if (str.length <= len) return str
        return str.slice(0, (len - 3) / 2) + '...' + str.slice(str.length - len + (len - 3) / 2)
    },
    makeID: (str1 = '', str2 = '') => {
        return str1.toUpperCase() + '_' + str2.toUpperCase()
    },
    formatBytes: (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    },
    getTextColorByBackgroundColor: (color = '#000000') => {
        var c = color.substring(1) // strip #
        var rgb = parseInt(c, 16) // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff // extract red
        var g = (rgb >> 8) & 0xff // extract green
        var b = (rgb >> 0) & 0xff // extract blue

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

        return luma < 140 ? '#ffffff' : '#000000'
    },
    getMaVanBan: (code, organ, type, date, c = 1) => {
        const d = new Date(date ?? Date.now())
        switch (c) {
            case 1:
            case '1':
                return `${code}/${d.getFullYear()}/${type}-${organ}`
            case 2:
            case '2':
                return `${code}/${type}-${organ}`
            case 3:
            case '3':
                return `${code}/${organ}-${type}`
            default:
                return `${code}/${d.getFullYear()}/${type}-${organ}`
        }
    },
}

export default Helpers