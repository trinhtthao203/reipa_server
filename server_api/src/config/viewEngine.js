import express from "express";
import db from "../models";
const path = require('path')
const configViewEngine = (app) => {

    //Use engine use ejs
    app.set("view engine", "ejs");
    app.set("views", "./src/views")


}

module.exports = configViewEngine;