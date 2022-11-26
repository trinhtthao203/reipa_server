import db from "../models/index";
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');

//get all
const handleGetAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let statusData = await sequelize.query(
                `
                SELECT * FROM public."Status"
                `,
                {
                    type: QueryTypes.SELECT
                }
            );
            if (statusData) {
                resolve({
                    code: 200,
                    data: statusData
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
    handleGetAll: handleGetAll
}