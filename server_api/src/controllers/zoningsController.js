import dotenv from "dotenv";
import zoningService from "../services/zonings.service"
import Strings from "../constants/strings";
import multer from "multer";
const path = require("path");
dotenv.config();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: function (req, file, cb) {
        cb(null, "zoning-" + Date.now() + "-" + file.originalname);
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
}).array("dataImage");

const getAllZoning = async (req, res) => {
    let { page, size } = req.body;
    if (page === '' || page === undefined || page === null || !size) {
        return res.status(400).json({
            code: 400,
            data: {
                message: "Nhập page, size"
            }
        })
    }
    let zoningData = await zoningService.handleGetAllZoning(page, size);

    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const getZoningPolygonID = async (req, res) => {
    const { status_id, id } = req.body;
    if (!status_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_STATUSID_MESSAGE,
            }
        })
    }
    if (!id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_POLYGONID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetZoningPolygonID(status_id, id);

    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const getZoningPolylineDistance = async (req, res) => {
    const { status_id, lat, lng } = req.body;
    if (!status_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_STATUSID_MESSAGE,
            }
        })
    }

    if (!lat || !lng) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_LATLNG_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetZoningPolylineDistance(status_id, lat, lng);

    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const getGeoJSONZoning = async (req, res) => {
    const { status_id } = req.body;
    if (!status_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_STATUSID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetGeoJSONZoning(status_id);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const getGeoJSONZoningPolygon = async (req, res) => {
    const { status_id } = req.body;
    if (!status_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_STATUSID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetGeoJSONZoningPolygon(status_id);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const getGeoJSONZoningPolyline = async (req, res) => {
    const { status_id } = req.body;
    if (!status_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_STATUSID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetGeoJSONZoningPolyline(status_id);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const addZoning = async (req, res) => {
    image_upload(req, res, function (err) {
        const zoning = req.body;
        const dataImage = req.files;
        if (!zoning.name || !zoning.coordinates || !zoning.typeof_zoning_id || !zoning.user_id || !zoning.purpose || !zoning.status_id) {
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.FEILD_REQUIRED_MESSAGE
                }
            })
        }

        if (!dataImage) {
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.REQUIRED_IMAGES_MESSAGE
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
            let zoningData = zoningService.handleAddZoning(zoning, dataImage);
            return res.status(200).json({
                code: zoningData.code,
                data: zoningData.data ? zoningData.data : {}
            })
        }
    })
}

const getByID = async (req, res) => {
    const { zoning_id } = req.body;
    if (!zoning_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_ID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetZoningByID(zoning_id);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}


const getByUserID = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_USER_ID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetZoningByUserID(user_id);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const deleteZoning = async (req, res) => {
    const { zoning_id } = req.body;
    if (!zoning_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_ID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleDeleteZoning(zoning_id);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const updateStatus = async (req, res) => {
    const { zoning_id, status_id } = req.body;
    if (!zoning_id || !status_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Message.FEILD_REQUIRED_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleUpdateStatus(req.body);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const getGeoJSONByID = async (req, res) => {
    const { zoning_id } = req.body;
    if (!zoning_id) {
        return res.status(400).json({
            code: 400,
            data: {
                message: Strings.Zoning.REQUEST_ID_MESSAGE,
            }
        })
    }
    let zoningData = await zoningService.handleGetGeoJSONByID(zoning_id);
    return res.status(200).json({
        code: zoningData.code,
        data: zoningData.data ? zoningData.data : {}
    })
}

const updateZoning = async (req, res) => {
    image_upload(req, res, function (err) {
        const zoning = req.body;
        const { id } = req.body;
        console.log(req.body)
        if (!id) {
            return res.status(400).json({
                code: 400,
                data: {
                    message: Strings.Message.FEILD_REQUIRED_MESSAGE,
                }
            })
        }
        let zoningData = zoningService.handleUpdateZoning(req.body);
        return res.status(200).json({
            code: zoningData.code,
            data: zoningData.data ? zoningData.data : {}
        })
    })

}

module.exports = {
    getAllZoning: getAllZoning,
    addZoning: addZoning,
    getGeoJSONZoning: getGeoJSONZoning,
    getGeoJSONZoningPolygon: getGeoJSONZoningPolygon,
    getGeoJSONZoningPolyline: getGeoJSONZoningPolyline,
    getZoningPolygonID: getZoningPolygonID,
    getZoningPolylineDistance: getZoningPolylineDistance,
    getByID: getByID,
    getByUserID: getByUserID,
    deleteZoning: deleteZoning,
    updateStatus: updateStatus,
    getGeoJSONByID: getGeoJSONByID,
    updateZoning: updateZoning,
}