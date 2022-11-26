import db from "../models/index";
import crudSevice from "../services/crud.service"

const getHomePage = async (req, res) => {

    try {
        let data = await db.Users.findAll();
        console.log(data)
        return res.render("home.ejs", {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }

}

const postUser = async (req, res) => {
    var msg = await crudSevice.createNewUser(req.body);
    console.log(msg);
    return res.send("post crud");
}

const getCRUD = async (req, res) => {
    return res.render("crud.ejs")
}

const displayGetUser = async (req, res) => {
    var data = await crudSevice.getAllUser();
    return res.render("display-all-users.ejs", {
        dataTable: data
    })
}


const getEditUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userInfo = await crudSevice.getUserInfoById(userId);
        return res.render("edit-user.ejs", {
            user: userInfo
        })
    } else {
        return res.send("User not found !!!!!")
    }
}

const putUserInfo = async (req, res) => {
    let data = req.body;
    let allUsers = await crudSevice.updateUserInfo(data);
    return res.render("display-all-users.ejs", {
        dataTable: allUsers
    })
}

const deleteUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let allUsers = await crudSevice.deleteUser(userId);
        return res.render("display-all-users.ejs", {
            dataTable: allUsers
        })
    } else {
        return res.send("User not found !!!!!")
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    displayGetUser: displayGetUser,
    getEditUser: getEditUser,
    postUser: postUser,
    putUserInfo: putUserInfo,
    deleteUser: deleteUser
}