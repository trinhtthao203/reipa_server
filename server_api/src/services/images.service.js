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
const handleGetAllImagesByZoningID = (zoning_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imageData = await sequelize.query(`
                SELECT name FROM public."Images"
                WHERE zoning_id=?
            `, {
                replacements: [zoning_id],
                type: QueryTypes.SELECT
            });
            if (imageData) {
                resolve({
                    code: 200,
                    data: imageData
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

const handleGetAllImagesByPostID = (post_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imageData = await sequelize.query(`
                SELECT name FROM public."Images"
                WHERE post_id=?
            `, {
                replacements: [post_id],
                type: QueryTypes.SELECT
            });
            if (imageData) {
                resolve({
                    code: 200,
                    data: imageData
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

const handleGetOneImageByZoningID = (zoning_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imageData = await sequelize.query(`
                SELECT name FROM public."Images"
                WHERE zoning_id=?
                ORDER BY id ASC
                LIMIT 1
            `, {
                replacements: [zoning_id],
                type: QueryTypes.SELECT
            });
            if (imageData) {
                resolve({
                    code: 200,
                    data: imageData
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

const handleGetOneImageByPostID = (zoning_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imageData = await sequelize.query(`
                SELECT name FROM public."Images"
                WHERE post_id=?
                ORDER BY id ASC
                LIMIT 1
            `, {
                replacements: [zoning_id],
                type: QueryTypes.SELECT
            });
            if (imageData) {
                resolve({
                    code: 200,
                    data: imageData
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
    handleGetAllImagesByZoningID: handleGetAllImagesByZoningID,
    handleGetAllImagesByPostID: handleGetAllImagesByPostID,
    handleGetOneImageByZoningID: handleGetOneImageByZoningID,
    handleGetOneImageByPostID: handleGetOneImageByPostID
}