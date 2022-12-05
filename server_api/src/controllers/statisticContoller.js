import db from "../models/index";
import statisticService from "../services/statistic.service"
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

const statisticsUserMonth = async (req, res) => {
    const { startd, endd } = req.body;
    if (!startd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_STARTD_MESSAGE
            }
        })
    }
    if (!endd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_ENDD_MESSAGE
            }
        })
    }

    let userData = await statisticService.handleStatisticsUserMonth(req.body);
    return res.status(200).json({
        code: userData.code,
        data: userData.data
    })
}
const statisticsPostMonth = async (req, res) => {
    const { startd, endd } = req.body;
    if (!startd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_STARTD_MESSAGE
            }
        })
    }
    if (!endd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_ENDD_MESSAGE
            }
        })
    }

    let userData = await statisticService.handleStatisticsPostMonth(req.body);
    return res.status(200).json({
        code: userData.code,
        data: userData.data
    })
}
const statisticsZoningMonth = async (req, res) => {
    const { startd, endd } = req.body;
    if (!startd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_STARTD_MESSAGE
            }
        })
    }
    if (!endd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_ENDD_MESSAGE
            }
        })
    }

    let userData = await statisticService.handleStatisticsZoningMonth(req.body);
    return res.status(200).json({
        code: userData.code,
        data: userData.data
    })
}

const statisticsPostField = async (req, res) => {
    const { startd, endd, province_id, district_id, ward_id, typeof_post_id, typeof_real_estate_id } = req.body;
    console.log(req.body)
    if (!startd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_STARTD_MESSAGE
            }
        })
    }
    if (!endd) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_ENDD_MESSAGE
            }
        })
    }
    if (!province_id || !district_id || !ward_id || !typeof_post_id || !typeof_real_estate_id) {
        return res.status(401).json({
            code: 401,
            data: {
                message: "Vui lòng nhập các trường bắt buộc"
            }
        })
    }

    let userData = await statisticService.handleStatisticsPostField(req.body);
    return res.status(200).json({
        code: userData.code,
        data: userData.data
    })
}


module.exports = {
    statisticsUserMonth: statisticsUserMonth,
    statisticsPostMonth: statisticsPostMonth,
    statisticsZoningMonth: statisticsZoningMonth,
    statisticsPostField: statisticsPostField,
}