import Constants from "../constants";
import BaseService from "./base.service";
import { getToken } from "../components/useLocalStorage";
class PostService extends BaseService {
    getAll = async (page, size) => {
        const result = await this.api.post({
            path: Constants.ApiPath.POST_GET_ALL,
            data: {
                page: page,
                size: size
            }
        })
        return result.data;
    }
    delete = async (post_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.POST_DELETE,
            data: {
                post_id: post_id,
            }
        })
        return result.data;
    }
    get_by_id = async (post_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.POST_GEOJSON_BY_ID,
            data: {
                post_id: post_id,
            }
        })
        return result.data;
    }

    update_status = async (post_id, status_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.POST_UPDATE_STATUS,
            headers: {
                "Authorization": `Beaer ${getToken(Constants.StorageKeys.ACCESS_TOKEN)}`,
            },
            data: {
                post_id: post_id,
                status_id: status_id
            }
        })
        return result.data;
    }

    get_type_of_post = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.TYPEOF_POST,
        })
        return result.data;
    }

    get_type_of_real_estate = async () => {
        const result = await this.api.get({
            path: Constants.ApiPath.TYPEOF_REAL_ESTATE,
        })
        return result.data;
    }
}
export default PostService;