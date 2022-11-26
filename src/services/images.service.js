import Constants from "../constants";
import BaseService from "./base.service";

class ZoningService extends BaseService {
    get_by_post_id = async (post_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.IMAGE_BY_POST,
            data: {
                post_id: post_id,
            }
        })
        return result.data;
    }
    get_by_zoning_id = async (zoning_id) => {
        const result = await this.api.post({
            path: Constants.ApiPath.IMAGE_BY_ZONING,
            data: {
                zoning_id: zoning_id,
            }
        })
        return result.data;
    }
}

export default ZoningService;