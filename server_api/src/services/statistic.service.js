import db from "../models/index";
import Strings from "../constants/strings";
const { Op } = require("sequelize");
import dotenv from "dotenv";
dotenv.config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');

const handleStatisticsUserMonth = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const startDate = new Date(body.startd);
            const endDate = new Date(body.endd);
            await db.Users.count({ distinct: 'id', where: { "createdAt": { [Op.between]: [startDate, endDate] } } })
                .then((result) => {
                    resolve({
                        code: 200,
                        data: result
                    })
                })
                .catch((error) => {
                    console.log(error);
                    resolve({
                        code: 200,
                        data: {
                            message: "Ngày không hợp lệ"
                        }
                    })
                })
        } catch (err) {
            reject(err);
        }
    })
}
const handleStatisticsPostMonth = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const startDate = new Date(body.startd);
            const endDate = new Date(body.endd);
            await db.Posts.count({ distinct: 'id', where: { "createdAt": { [Op.between]: [startDate, endDate] } } })
                .then((result) => resolve({
                    code: 200,
                    data: result
                }))
                .catch((error) => {
                    console.log(error);
                    resolve({
                        code: 200,
                        data: {
                            message: "Ngày không hợp lệ"
                        }
                    })
                })
        } catch (err) {
            reject(err);
        }
    })
}

const handleStatisticsZoningMonth = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const startDate = new Date(body.startd);
            const endDate = new Date(body.endd);
            await db.Zonings.count({ distinct: 'id', where: { "createdAt": { [Op.between]: [startDate, endDate] } } })
                .then((result) => resolve({
                    code: 200,
                    data: result
                }))
                .catch((error) => {
                    console.log(error);
                    resolve({
                        code: 200,
                        data: {
                            message: "Ngày không hợp lệ"
                        }
                    })
                })
        } catch (err) {
            reject(err);
        }
    })
}
const handleStatisticsPostField = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const startDate = new Date(body.startd);
            const endDate = new Date(body.endd);
            await db.Posts.count({
                distinct: 'id',
                where: {
                    "createdAt": {
                        [Op.between]: [startDate, endDate]
                    },
                    "province_id": body.province_id,
                    "district_id": body.district_id,
                    "ward_id": body.ward_id,
                    "typeof_posts_id": body.typeof_post_id,
                    "typeof_real_estate_id": body.typeof_real_estate_id,
                }
            })
                .then((result) => {
                    console.log(result)
                    resolve({
                        code: 200,
                        data: result
                    })
                })
                .catch((error) => {
                    console.log(error);
                    resolve({
                        code: 200,
                        data: {
                            message: "Ngày không hợp lệ"
                        }
                    })
                })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleStatisticsUserMonth: handleStatisticsUserMonth,
    handleStatisticsPostMonth: handleStatisticsPostMonth,
    handleStatisticsZoningMonth: handleStatisticsZoningMonth,
    handleStatisticsPostField: handleStatisticsPostField
}