import Strings from "../constants/strings";
import db from "../models/index";
require('dotenv').config();
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');

const handleGetAllDistrict = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let districtData = await db.Districts.findAll();
            if (districtData) {
                resolve({
                    code: 200,
                    data: {
                        district: districtData,
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

const getHandledistrictByProvince = (province_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let districtData = await db.Districts.findAll({
                where: {
                    province_id: province_id
                },
                order: [
                    ['name', 'ASC'],
                ],
            })
            if (districtData) {
                resolve({
                    code: 200,
                    data: {
                        district: districtData,
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

const getHandleGetBorderDistrictByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let districtData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(t.*)::json)
                    )
                FROM public."Districts" as t(id, name, type)
                WHERE id=?`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );
            if (districtData) {
                resolve({
                    code: 200,
                    data: districtData
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
    handleGetAllDistrict: handleGetAllDistrict,
    getHandledistrictByProvince: getHandledistrictByProvince,
    getHandleGetBorderDistrictByID: getHandleGetBorderDistrictByID,
}