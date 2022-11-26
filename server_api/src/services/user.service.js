import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
import Strings from "../constants/strings";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Constants from "../constants";
const { Op } = require("sequelize");
dotenv.config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');
//get all

const handleGetAllUser = (page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.Users.findAndCountAll({
                attributes: [
                    Strings.Database.ID,
                    Strings.Database.PHONE_NUMBER,
                    Strings.Database.FULL_NAME,
                    Strings.Database.AVATAR,
                    Strings.Database.ADDRESS,
                    Strings.Database.STREET_ID,
                    Strings.Database.WARD_ID,
                    Strings.Database.ROLE_ID,
                ],
                limit: parseInt(size),
                offset: parseInt(page) * parseInt(size),
            });
            if (userInfo) {
                resolve({
                    code: 200,
                    data: {
                        size: size,
                        currentPage: page,
                        userInfo: userInfo,
                    }
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

const handleGetAllRole = (page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            let roleData = await db.Roles.findAll({
                attributes: [
                    "id", "name", "icon", "description"
                ],
            });
            if (roleData) {
                resolve({
                    code: 200,
                    data:
                        roleData

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

//handle

const handleUserLogOut = () => {
    return new Promise(async (resolve, reject) => {

    })
}

const handleUserLogIn = (phonenumber, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await sequelize.query(
                `
                SELECT u.*, war.ward_name, war.district_name, war.province_name
                FROM public."Users" AS u 
                LEFT JOIN (SELECT w.id as id, w.name as ward_name, d.name as district_name, p.name as province_name FROM public."Wards" as w, public."Provinces" as p, public."Districts" AS d WHERE w.province_id = p.id AND w.district_id=d.id)AS war ON u.ward_id=war.id
                WHERE u.phonenumber=?
                `,
                {
                    replacements: [phonenumber],
                    type: QueryTypes.SELECT
                }
            );
            if (userInfo.length > 0) {
                let check = await bcrypt.compareSync(password, userInfo[0].password);
                if (check) {
                    const { password, ...others } = userInfo[0];
                    const accessToken = jwt.sign({ id: userInfo[0].id, role_id: userInfo[0].role_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: Constants.Api.EXPIRES_IN });
                    const refeshToken = jwt.sign({ id: userInfo[0].id, role_id: userInfo[0].role_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "365d" });
                    resolve({
                        code: 200,
                        data: { ...others, message: Strings.User.SUCCESS_LOGIN_MESSAGE },
                        accessToken: accessToken,
                        refreshToken: refeshToken
                    });
                } else {
                    resolve({
                        code: 401,
                        data: {
                            message: Strings.User.PASSWORD_INCORRECT_MESSAGE
                        }
                    });
                }
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.User.PHONE_NUMBER_INCORRECT_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.Users.findOne({
                where: { id: id }
            });

            if (userInfo) {
                resolve({
                    code: 200,
                    data: userInfo
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.User.ID_INCORRECT_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleUserRegister = (userInfo) => {
    console.log(userInfo)
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(userInfo.password);
            await db.Users.create({
                phonenumber: userInfo.phonenumber,
                password: hashPasswordFromBcrypt,
                fullname: userInfo.fullname,
                avatar: "",
                address: userInfo.address,
                street_id: userInfo.street_id,
                ward_id: userInfo.ward_id,
                role_id: userInfo.role_id,
            })
            resolve({
                code: 200,
                data: {
                    message: Strings.Register.SUCCESS_REGISTER_MESSAGE
                }
            });
        } catch (e) {
            reject(e);
        }
    })
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (err) {
            reject(err)
        }
    })
}

const checkExistsPhoneNumber = (phonenumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Users.findOne({
                where: { phonenumber: phonenumber }
            })
            if (check) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.Message.PHONE_NUMBER_EXISTS_MESSAGE
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.PHONE_NUMBER_NOT_EXISTS_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleResetPassword = (phonenumber, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Users.findOne({
                where: { phonenumber: phonenumber }
            })
            if (check) {
                let hashPasswordFromBcrypt = await hashUserPassword(password);
                let succes = await db.Users.update(
                    { password: hashPasswordFromBcrypt },
                    { where: { phonenumber: phonenumber } }
                )
                if (succes) {
                    resolve({
                        code: 200,
                        data: {
                            message: "Đổi thành công"
                        }
                    });
                } else {
                    resolve({
                        code: 400,
                        data: {
                            message: "Đổi không thành công"
                        }
                    });
                }
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Auth.PHONE_NUMBER_INCORRECT_MESSAGE
                    }
                });
            }


        } catch (err) {
            reject(err);
        }
    })
}

const checkExistsPost = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Posts.findAll({
                where: { user_id: user_id }
            })
            if (check[0] !== undefined) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.Message.POST_EXISTS_MESSAGE
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.POST_NOT_EXISTS_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}
const checkExistsZoning = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Zonings.findAll({
                where: { user_id: user_id }
            })
            if (check[0] !== undefined) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.Message.ZONING_EXISTS_MESSAGE
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.ZONING_NOT_EXISTS_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleDeleteUser = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.Users.destroy({ where: { id: user_id } });
            if (count) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.User.DELETE_USER_SUCCESS_MESSAGE
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.User.DELETE_USER_NOT_SUCCESS_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleUpdateUser = (user, userImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Users.update(
                {
                    fullname: user.fullname,
                    role_id: user.role_id,
                    address: user.address,
                    avatar: userImage ? userImage.filename : null,
                    ward_id: user.ward_id,
                    street_id: user.street_id,
                },
                { where: { id: user.id } }
            )
                .then(async (result) => {
                    if (result[0]) {
                        resolve({
                            code: 200,
                            data: {
                                message: "Cập nhật thành công"
                            }
                        })
                    } else {
                        resolve({
                            code: 400,
                            data: {
                                message: "Các thông tin nhập vào chưa chính xác. Vui lòng kiểm tra lại",
                            }
                        })
                    }
                })
        } catch (e) {
            console.log(e);
        }
    })
}

const handlGetByID = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await sequelize.query(
                `
                SELECT u.*, war.district_id, war.province_id
                FROM public."Users" AS u 
                LEFT JOIN (SELECT w.id as id, w.name as ward_name, d.id as district_id, p.id as province_id FROM public."Wards" as w, public."Provinces" as p, public."Districts" AS d WHERE w.province_id = p.id AND w.district_id=d.id)AS war ON u.ward_id=war.id
                WHERE u.id=?
                `,
                {
                    replacements: [user_id],
                    type: QueryTypes.SELECT
                }
            );
            if (userInfo.length > 0) {
                resolve({
                    code: 200,
                    data: userInfo
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.User.ID_INCORRECT_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}
module.exports = {
    handleUserLogIn: handleUserLogIn,
    handleGetAllUser: handleGetAllUser,
    handleUserRegister: handleUserRegister,
    checkExistsPhoneNumber: checkExistsPhoneNumber,
    handleUserLogOut: handleUserLogOut,
    handleGetUser: handleGetUser,
    handleGetAllRole: handleGetAllRole,
    handleResetPassword: handleResetPassword,
    checkExistsPost: checkExistsPost,
    checkExistsZoning: checkExistsZoning,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    handlGetByID: handlGetByID,
}