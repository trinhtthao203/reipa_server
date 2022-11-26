import db from "../models/index";
import Strings from "../constants/strings";
require('dotenv').config();
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');

const handleGetAllProvince = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let provincesData = await db.Provinces.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (provincesData) {
                resolve({
                    code: 200,
                    data: {
                        provinces: provincesData,
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

const handleGetBorderProvinceByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let provincesData = await sequelize.query(
                `SELECT json_build_object(
                        'type', 'FeatureCollection',
                        'features', json_agg(ST_AsGeoJSON(t.*)::json)
                        )
                    FROM public."Provinces" as t(id, name, type)
                    WHERE id=?`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );
            if (provincesData) {
                resolve({
                    code: 200,
                    data: provincesData
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

const handleUpdateBorderProvince = (id, geometry) => {
    return new Promise(async (resolve, reject) => {
        try {
            let provincesData = await db.Provinces.update(
                { coordinates: geometry },
                { where: { id: id } }
            )
            if (provincesData) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.Provinces.UPDATE_BORDER_PROVINCE_SUCCES
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

module.exports = {
    handleGetAllProvince: handleGetAllProvince,
    handleGetBorderProvinceByID: handleGetBorderProvinceByID,
    handleUpdateBorderProvince: handleUpdateBorderProvince
}