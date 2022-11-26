import db from "../models/index";
import bcrypt from "bcryptjs";
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

//get all
const handleGetAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let typeData = await db.Typeof_zonings.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (typeData) {
                resolve({
                    code: 200,
                    data: typeData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleGetAllType: handleGetAllType
}