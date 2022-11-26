import db from "../models/index";
import imageService from "../services/images.service";
import Strings from "../constants/strings";
import dotenv from "dotenv";
dotenv.config();

const getAllImageByZoningID = async (req, res) => {
    const { zoning_id } = req.body;
    if (!zoning_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Image.REQUEST_ZONING_ID_MESSAGE
            }
        })
    }
    let imageData = await imageService.handleGetAllImagesByZoningID(zoning_id);

    return res.status(200).json({
        code: imageData.code,
        data: imageData.data ? imageData.data : {}
    })
}
const getAllImageByPostID = async (req, res) => {
    const { post_id } = req.body;
    if (!post_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.POST.REQUEST_ID_MESSAGE
            }
        })
    }
    let imageData = await imageService.handleGetAllImagesByPostID(post_id);

    return res.status(200).json({
        code: imageData.code,
        data: imageData.data ? imageData.data : {}
    })
}

const getOneImageByZoningID = async (req, res) => {
    const { zoning_id } = req.body;
    if (!zoning_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Image.REQUEST_ZONING_ID_MESSAGE
            }
        })
    }
    let imageData = await imageService.handleGetOneImageByZoningID(zoning_id);

    return res.status(200).json({
        code: imageData.code,
        data: imageData.data ? imageData.data : {}
    })
}

const getOneImageByPostID = async (req, res) => {
    const { post_id } = req.body;
    if (!post_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Image.REQUEST_POST_ID_MESSAGE
            }
        })
    }
    let imageData = await imageService.handleGetOneImageByPostID(post_id);

    return res.status(200).json({
        code: imageData.code,
        data: imageData.data ? imageData.data : {}
    })
}
module.exports = {
    getAllImageByZoningID: getAllImageByZoningID,
    getAllImageByPostID: getAllImageByPostID,
    getOneImageByZoningID: getOneImageByZoningID,
    getOneImageByPostID: getOneImageByPostID,
}