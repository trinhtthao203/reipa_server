import db from "../models/index";
import userService from "../services/user.service"
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
const path = require("path");
dotenv.config();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: function (req, file, cb) {
        cb(null, "avatar-" + Date.now() + "-" + file.originalname);
    }
})
const image_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error(Strings.Common.REQUIRE_TYPE_IMAGE)
            err.name = "ExtensionError"
            return cb(err);
        }
    },
}).single("userImage");

//get all
const getAllUser = async (req, res) => {
    let { page, size } = req.body;
    if (page === '' || page === undefined || page === null || !size) {
        return res.status(400).json({
            code: 400,
            data: {
                message: "Nhập page, size"
            }
        })
    }

    let userData = await userService.handleGetAllUser(page, size);
    return res.status(200).json({
        code: userData.code,
        data: userData.data ? userData.data : {}
    })
}

const getAllRole = async (req, res) => {
    let roleData = await userService.handleGetAllRole();
    return res.status(200).json({
        code: roleData.code,
        data: roleData.data ? roleData.data : {}
    })
}

//handle
const handleLogOut = async (req, res) => {
    let userData = await userService.handleUserLogOut();
    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const handleResetPasword = async (req, res) => {
    const { phonenumber, password } = req.body;
    if (!phonenumber) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.User.PHONENUMBER_REQUIRED_MESSAGE
            }
        })
    }
    if (!password) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.User.PASSWORD_REQUIRED_MESSAGE
            }
        })
    }

    let userData = await userService.handleResetPassword(phonenumber, password);
    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const handleCheckPhoneNumber = async (req, res) => {
    const { phonenumber } = req.body;
    if (!phonenumber) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.User.PHONENUMBER_REQUIRED_MESSAGE,
            }
        })
    }

    let userData = await userService.checkExistsPhoneNumber(phonenumber);

    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}


const handleRegister = async (req, res) => {
    console.log(req.body)
    const { phonenumber, password, fullname, role_id } = req.body;
    if (!phonenumber || !password || !fullname || !role_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Message.FEILD_REQUIRED_MESSAGE,
            }
        })
    }
    let checkPhoneNumber = await userService.checkExistsPhoneNumber(phonenumber);
    if (checkPhoneNumber.code == 200) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Register.PHONE_NUMBER_EXISTS_MESSAGE,
            }
        })
    }

    let userData = await userService.handleUserRegister(req.body);
    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const handleLogIn = async (req, res) => {
    const { phonenumber, password } = req.body;
    if (!phonenumber) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.User.PHONENUMBER_REQUIRED_MESSAGE
            }
        })
    }
    if (!password) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.User.PASSWORD_REQUIRED_MESSAGE
            }
        })
    }

    let userData = await userService.handleUserLogIn(phonenumber, password);
    res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict"
    })

    return res.status(200).json({
        code: userData.code,
        data: {
            userInfo: userData.data,
            accessToken: userData.accessToken
        }
    })
}

const deleteUser = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.User.REQUEST_ID_MESSAGE,
            }
        })
    }

    if (user_id == 1) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.User.DELETE_USER_REFUSE_MESSAGE,
            }
        })
    }

    let isPost = await userService.checkExistsPost(user_id);
    if (isPost.code === 200) {
        return res.status(400).json({
            code: 400,
            data: {
                message: isPost.data.message,
            }
        })
    }
    let isZoning = await userService.checkExistsZoning(user_id);
    if (isZoning.code === 200) {
        return res.status(400).json({
            code: 400,
            data: {
                message: isZoning.data.message,
            }
        })
    }

    let userData = await userService.handleDeleteUser(user_id);
    return res.status(200).json({
        code: userData.code,
        data: userData.data,
    })
}

const updateUser = async (req, res) => {
    image_upload(req, res, async (err) => {
        const user = req.body;
        const userImage = req.file;
        if (!user.id) {
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.FEILD_REQUIRED_MESSAGE
                }
            })
        }

        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).json({
                code: 500,
                data: {
                    message: `Multer uploading error: ${err.message}`
                }
            })
        } else if (err) {
            // An unknown error occurred when uploading.
            if (err.name == 'ExtensionError') {
                return res.status(413).json({
                    code: 413,
                    data: {
                        message: err.message
                    }
                })
            } else {
                return res.status(500).json({
                    code: 500,
                    data: {
                        message: `Multer uploading error: ${err.message}`
                    }
                })
            }
        } else {
            let userData = await userService.handleUpdateUser(user, userImage);
            return res.status(200).json({
                code: userData.code,
                data: userData.data
            })
        }
    })
}

const getByID = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(401).json({
            code: 401,
            data: {
                message: Strings.User.REQUEST_ID_MESSAGE
            }
        })
    }

    let userData = await userService.handlGetByID(user_id);
    return res.status(200).json({
        code: userData.code,
        data: userData.data ? userData.data : {}
    })
}
module.exports = {
    handleLogIn: handleLogIn,
    getAllUser: getAllUser,
    handleRegister: handleRegister,
    handleLogOut: handleLogOut,
    handleCheckPhoneNumber: handleCheckPhoneNumber,
    handleResetPasword: handleResetPasword,
    getAllRole: getAllRole,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getByID: getByID
}