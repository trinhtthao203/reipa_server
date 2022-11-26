
import db from "../models";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

//get all user account from database
const getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findAll({
                raw: true
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

const getUserInfoById = async (userId) => {
    console.log(userId);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

const updateUserInfo = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.fullname = data.fullname;
                user.address = data.address;
                await user.save();

                let allUsers = await db.Users.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: id }
            })
            if (user) {
                await user.destroy();
            }
            let allUsers = await db.Users.findAll();
            resolve(allUsers);
        } catch (e) {
            reject(e);
        }
    })
}

const createNewUser = async (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(userInfo.password);
            await db.Users.create({
                phonenumber: userInfo.phonenumber,
                password: hashPasswordFromBcrypt,
                fullname: userInfo.fullname,
                address: userInfo.address,
                street_id: userInfo.street_id,
                ward_id: userInfo.ward_id,
                avatar: "",
                role_id: userInfo.role_id,
                created_at: new Date(),
                updated_at: new Date(),
            })
            resolve("Create a new user success !!!!!")
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

module.exports = {
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserInfo: updateUserInfo,
    deleteUser: deleteUser
}