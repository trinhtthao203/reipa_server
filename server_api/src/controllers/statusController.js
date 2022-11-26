import db from "../models/index";
import statusService from "../services/status.service"
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

//get all
const getAll = async (req, res) => {
    let statusData = await statusService.handleGetAll();
    return res.status(200).json({
        code: statusData.code,
        data: statusData.data ? statusData.data : {}
    })
}

module.exports = {
    getAll: getAll,
}