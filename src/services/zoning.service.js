import Constants from "../constants";
import BaseService from "./base.service";
import { getToken } from "../components/useLocalStorage";

class ZoningService extends BaseService {
    getAll = async (page, size) => {
        const result = await this.api.post({
            path: Constants.ApiPath.ZONING_GET_ALL,
            data: {
                page: page,
                size: size
            }
        })
        return result.data;
    }
    delete = async (zoning_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.ZONING_DELETE,
            data: {
                zoning_id: zoning_id,
            }
        })
        return result.data;
    }
    get_by_id = async (zoning_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.ZONING_BY_ID,
            data: {
                zoning_id: zoning_id,
            }
        })
        return result.data;
    }

    update_status = async (zoning_id, status_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.ZONING_UPDATE_STATUS,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                zoning_id: zoning_id,
                status_id: status_id
            }
        })
        return result.data;
    }
}

export default ZoningService;