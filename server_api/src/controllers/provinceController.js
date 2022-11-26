import db from "../models/index";
import provinceService from "../services/provinces.service"

import dotenv from "dotenv";
import Strings from "../constants/strings";
dotenv.config();

const getAllProvince = async (req, res) => {
    let provinceData = await provinceService.handleGetAllProvince();

    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}

const updateBorderProvince = async (req, res) => {
    const { id, geometry } = req.body;
    let provinceData = await provinceService.handleUpdateBorderProvince(id, geometry);

    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}

const getBorderProvinceByID = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Provinces.REQUEST_PROVINCE_ID,
            }
        })
    }
    let provinceData = await provinceService.handleGetBorderProvinceByID(id);

    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}

module.exports = {
    getAllProvince: getAllProvince,
    updateBorderProvince: updateBorderProvince,
    getBorderProvinceByID: getBorderProvinceByID,
}