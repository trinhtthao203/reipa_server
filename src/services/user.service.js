import Constants from "../constants";
import BaseService from "./base.service";

import { getToken } from "../components/useLocalStorage";

class UserService extends BaseService {
    Login = async (phonenumber, password) => {
        const result = await this.api.post({
            path: Constants.ApiPath.LOGIN,
            data: {
                phonenumber: phonenumber,
                password: password
            }
        })
        return result.data
    }

    AllUser = async (page, size) => {
        const result = await this.api.post({
            path: Constants.ApiPath.ALL_USER,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                page: page,
                size: size
            },

        })
        return result.data
    }

    AllRole = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.ALL_ROLE,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
        })
        return result.data
    }

    delete = async (user_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.DELETE_USER,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                user_id: user_id,
            },
        })
        return result.data;
    }

    getProvince = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.GET_PROVINCE_LIST,
        })
        return result.data;
    }

    getDistrictByProvince = async (province_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.GET_DISTRICT_BYPROVINCE,
            data: {
                province_id: province_id,
            }
        })
        return result.data;
    }

    getWardByProvinceDistrict = async (province_id, district_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.GET_WARD_BY_DISTRICT_PROVINCE,
            data: {
                province_id: province_id,
                district_id: district_id
            }
        })
        return result.data;
    }

    getStreetByProvinceDistrict = async (province_id, district_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.GET_STREET_BY_DISTRICT_PROVINCE,
            data: {
                province_id: province_id,
                district_id: district_id
            }
        })
        return result.data;
    }

    register = async (phonenumber, password, fullname, address, street_id, ward_id, role_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.REGISTER,
            data: {
                phonenumber: phonenumber,
                password: password,
                fullname: fullname,
                address: address,
                street_id: street_id,
                ward_id: ward_id,
                role_id: role_id,
            }
        });
        return result.data;
    }

    userByID = async (user_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.USER_BY_ID,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                user_id: user_id
            }
        })
        return result.data;
    }

    update = async (user_id, role_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.UPDATE_USER,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                id: user_id,
                role_id: role_id
            }
        })
        return result.data;
    }
    // handleCheckPhoneNumber = async (phonenumber) => {
    //     try {
    //         const result = apiProcessor.post(Constants.ApiPath.CHECK_PHONENUMBER, {
    //             phonenumber: phonenumber,
    //         })
    //         return result;
    //     } catch (err) {
    //         console.log("service:", JSON.stringify(err));
    //     }
    // }

    // handleResetPassword = async (phonenumber, password) => {
    //     try {
    //         const result = apiProcessor.post(Constants.ApiPath.RESET_PASSWORD, {
    //             phonenumber: phonenumber,
    //             password: password
    //         })
    //         return result;
    //     } catch (err) {
    //         console.log("service:", JSON.stringify(err));
    //     }
    // }
}

export default UserService;