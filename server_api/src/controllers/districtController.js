import db from "../models/index";
import districtService from "../services/districts.service"
import Strings from "../constants/strings";

import dotenv from "dotenv";
dotenv.config();

const getAllDistrict = async (req, res) => {
    let districtData = await districtService.handleGetAllDistrict();

    return res.status(200).json({
        code: districtData.code,
        data: districtData.data ? districtData.data : {}
    })
}

const getDistrictByProvince = async (req, res) => {
    const { province_id } = req.body;
    if (!province_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Provinces.REQUEST_PROVINCE_ID
            }
        })
    }

    let districtData = await districtService.getHandledistrictByProvince(province_id);

    return res.status(200).json({
        code: districtData.code,
        data: districtData.data ? districtData.data : {}
    })
}

const getBorderDistrictByID = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Districts.REQUEST_DISTRICT_ID
            }
        })
    }

    let districtData = await districtService.getHandleGetBorderDistrictByID(id);

    return res.status(200).json({
        code: districtData.code,
        data: districtData.data ? districtData.data : {}
    })
}

module.exports = {
    getAllDistrict: getAllDistrict,
    getDistrictByProvince: getDistrictByProvince,
    getBorderDistrictByID: getBorderDistrictByID
}