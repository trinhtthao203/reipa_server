import db from "../models/index";
import streetService from "../services/streets.service"
import Strings from "../constants/strings";

import dotenv from "dotenv";
dotenv.config();

const getAllStreet = async (req, res) => {
    let streetData = await streetService.handleGetAllStreet();

    return res.status(200).json({
        code: streetData.code,
        data: streetData.data ? streetData.data : {}
    })
}

const getStreetSignUp = async (req, res) => {
    const { province_id, district_id } = req.body;
    if (!province_id || !district_id) {
        return res.status(400).json({
            code: 400,
            message: "Khong lay duoc ma tinh, ma huyen"
        })
    }
    let streetData = await streetService.handleGetStreetSignUp(province_id, district_id);

    return res.status(200).json({
        code: streetData.code,
        data: streetData.data ? streetData.data : {}
    })
}

module.exports = {
    getAllStreet: getAllStreet,
    getStreetSignUp: getStreetSignUp
}