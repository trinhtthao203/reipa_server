import Strings from "../constants/strings";
import db from "../models/index";
const { Op } = require("sequelize");
const handleGetAllStreet = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let streetData = await db.Streets.findAll();
            if (streetData) {
                resolve({
                    code: 200,
                    data: {
                        streets: streetData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleGetStreetSignUp = (province_id, district_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let streetData = await db.Streets.findAll({
                where: {
                    [Op.and]: [
                        { province_id: province_id },
                        { district_id: district_id }
                    ]
                },
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (streetData) {
                resolve({
                    code: 200,
                    data: {
                        streets: streetData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

module.exports = {
    handleGetAllStreet: handleGetAllStreet,
    handleGetStreetSignUp: handleGetStreetSignUp
}