import Constants from "../constants";
import BaseService from "./base.service";

class StatusService extends BaseService {
    getAll = async (e) => {
        const result = await this.api.get({
            path: Constants.ApiPath.STATUS_GET_ALL
        })
        return result.data;
    }
}

export default StatusService;