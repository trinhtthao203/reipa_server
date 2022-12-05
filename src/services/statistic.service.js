import Constants from "../constants";
import BaseService from "./base.service";
import { getToken } from "../components/useLocalStorage";

class StatisticService extends BaseService {
    getAccountMonth = async (startd, endd) => {
        const result = await this.api.post({
            path: Constants.ApiPath.STATISTIC_USER_MONTH,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                startd: startd,
                endd: endd
            }

        })
        return result.data;
    }
    getPostMonth = async (startd, endd) => {
        const result = await this.api.post({
            path: Constants.ApiPath.STATISTIC_POST_MONTH,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                startd: startd,
                endd: endd
            }

        })
        return result.data;
    }
    getZoningMonth = async (startd, endd) => {
        const result = await this.api.post({
            path: Constants.ApiPath.STATISTIC_ZONING_MONTH,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                startd: startd,
                endd: endd
            }

        })
        return result.data;
    }

    getPostField = async (startd, endd, province_id, district_id, ward_id, typeof_post_id, typeof_real_estate_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.STATISTIC_POST_FIELD,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                startd: startd,
                endd: endd,
                province_id: province_id,
                district_id: district_id,
                ward_id: ward_id,
                typeof_post_id: typeof_post_id,
                typeof_real_estate_id: typeof_real_estate_id
            }

        })
        return result.data;
    }

}

export default StatisticService;