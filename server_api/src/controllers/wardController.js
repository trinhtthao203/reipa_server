import db from "../models/index";
import wardService from "../services/wards.service"
import Strings from "../constants/strings";

import dotenv from "dotenv";
dotenv.config();

const getAllWard = async (req, res) => {
    let wardData = await wardService.handleGetAllWard();

    return res.status(200).json({
        code: wardData.code,
        data: wardData.data ? wardData.data : {}
    })
}

const getBorderWardByID = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Wards.REQUEST_WARD_MESSAGE,
            }
        })
    }
    let wardData = await wardService.handleGetBorderWardByID(id);

    return res.status(200).json({
        code: wardData.code,
        data: wardData.data ? wardData.data : {}
    })
}

const getWardSignUp = async (req, res) => {
    const { province_id, district_id } = req.body;
    if (!province_id || !district_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Wards.REQUEST_PROVINCE_MESSAGE,
            }
        })
    }
    let wardData = await wardService.getHandleWardSignUp(province_id, district_id);

    return res.status(200).json({
        code: wardData.code,
        data: wardData.data ? wardData.data : {}
    })
}

const updateBorder = async (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error);
    }
    res.send(file);

    // if (!province_id || !district_id) {
    //     console.log("Khong lay duoc ma tinh, ma huyen")
    // }
    // let wardData = await wardService.getHandleWardSignUp(province_id, district_id);

    // return res.status(200).json({
    //     code: wardData.code,
    //     data: wardData.data ? wardData.data : {}
    // })
}

const updateBorderID = async (req, res) => {
    const { province_id, district_id, ward_id, coordinates } = req.body;
    if (!province_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Wards.REQUEST_PROVINCE_MESSAGE,
            }
        })
    }
    if (!district_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Wards.REQUEST_DISTRICT_MESSAGE,
            }
        })
    }
    if (!ward_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Wards.REQUEST_WARD_MESSAGE,
            }
        })
    }
    if (!coordinates) {
        return res.status(200).json({
            code: 400,
            data: {
                message: Strings.Wards.REQUEST_COORDINATES_MESSAGE,
            }
        })
    }

    let checkExistWardID = await wardService.checkExistsWardID(province_id, district_id, ward_id);
    if (checkExistWardID.code === 400) {
        return res.status(400).json({
            code: 400,
            data: {
                message: checkExistWardID.data.message
            }
        })
    }

    let provinceData = await wardService.handleUpdateBorderID(province_id, district_id, ward_id, coordinates);
    return res.status(200).json({
        code: provinceData.code,
        data: provinceData.data ? provinceData.data : {}
    })
}


module.exports = {
    getAllWard: getAllWard,
    getWardSignUp: getWardSignUp,
    updateBorder: updateBorder,
    updateBorderID: updateBorderID,
    getBorderWardByID: getBorderWardByID
}