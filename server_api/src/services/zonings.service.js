import db from "../models/index";
import Strings from "../constants/strings";

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASS_WORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
});
const { QueryTypes } = require('sequelize');

const handleGetAllZoning = (page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await db.Zonings.findAndCountAll({
                order: [
                    ['name', 'ASC'],
                ],
                limit: parseInt(size),
                offset: parseInt(page) * parseInt(size),
            });
            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleGetGeoJSONZoning = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Zonings" WHERE status_id=?) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleGetGeoJSONZoningPolygon = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Zonings" WHERE status_id=? AND ispolygon=true) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleGetGeoJSONZoningPolyline = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Zonings" WHERE status_id=? AND ispolygon=false) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleUploadImage = async (id, dataImage) => {
    try {
        let max = await db.Images.max('id');
        let newArray = dataImage.map((item) => {
            ++max;
            return {
                "id": max,
                "name": item.filename,
                "zoning_id": id,
            }
        })
        await db.Images.bulkCreate(newArray)
    } catch (e) {
        console.log(e);
    }
}

const handleAddZoning = (zoning, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const max = await db.Zonings.max('id');
            let zoningData = await db.Zonings.create({
                id: max + 1,
                name: zoning.name,
                purpose: zoning.purpose,
                area: zoning.area,
                width: zoning.width,
                length: zoning.length,
                address: zoning.address,
                geometry: zoning.coordinates,
                ispolygon: zoning.ispolygon,
                description: zoning.description,
                province_id: zoning.province_id ? zoning.province_id : null,
                district_id: zoning.district_id ? zoning.district_id : null,
                ward_id: zoning.ward_id ? zoning.ward_id : null,
                user_id: zoning.user_id,
                typeof_zoning_id: zoning.typeof_zoning_id,
                status_id: zoning.status_id,
            })
                .then(async (result) => {
                    handleUploadImage(result.id, dataImage)
                })

            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleGetZoningPolygonID = (status_id, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT z.*,p.name AS province_name ,d.name as district_name, w.name as ward_name, u.fullname as user_name, u.phonenumber
                FROM public."Zonings" AS z 
                LEFT JOIN public."Provinces" AS p ON z.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON z.district_id=d.id
                LEFT JOIN public."Wards" AS w ON z.ward_id=w.id
                LEFt JOIN public."Users" AS u ON z.user_id = u.id
                WHERE z.ispolygon=true AND z.status_id=? AND z.id=?
                `,
                {
                    replacements: [status_id, id],
                    type: QueryTypes.SELECT
                }
            );

            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetZoningPolylineDistance = (status_id, lat, lng) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT z.*,p.name AS province_name ,d.name as district_name, w.name as ward_name, u.fullname as user_name, u.phonenumber, ROUND(((z.geometry::geography <-> ST_SetSRID(ST_MakePoint(?,?), 4326)::geography))::numeric,2) as dis_km 
                FROM public."Zonings" AS z
                LEFT JOIN public."Provinces" AS p ON z.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON z.district_id=d.id
                LEFT JOIN public."Wards" AS w ON z.ward_id=w.id
                LEFt JOIN public."Users" AS u ON z.user_id = u.id
                WHERE ROUND(((z.geometry::geography <-> ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography))::numeric,2)<z.width AND z.ispolygon=false AND z.status_id=?
                `,
                {
                    replacements: [lat, lng, lat, lng, status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetZoningByID = (zoning_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `
                SELECT zon.*, p.name as province_name, d.name as district_name, w.name as ward_name,
                u.fullname as user_name, u.phonenumber, u.avatar
                FROM public."Zonings" AS zon
                LEFT JOIN public."Provinces" AS p ON zon.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON zon.district_id=d.id
                LEFT JOIN public."Wards" AS w ON zon.ward_id=w.id
                LEFT JOIN public."Users" AS u ON zon.user_id = u.id 
                WHERE zon.id=?
                `,
                {
                    replacements: [zoning_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetZoningByUserID = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `
                SELECT z.*,p.name AS province_name ,d.name as district_name, w.name as ward_name, typ_z.name as type_name, sta.name as status_name
                FROM public."Zonings" AS z 
                LEFT JOIN public."Provinces" AS p ON z.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON z.district_id=d.id
                LEFT JOIN public."Wards" AS w ON z.ward_id=w.id
                LEFT JOIN public."Status" AS sta ON z.status_id=sta.id
                LEFT JOIN public."Typeof_zonings" AS typ_z ON z.typeof_zoning_id = typ_z.id
                WHERE z.user_id=? 
                `,
                {
                    replacements: [user_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: zoningData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.COMMON_ERROR
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}


const handleDeleteZoning = (zoning_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                DELETE FROM public."Images" WHERE zoning_id=(?);
                DELETE FROM public."Zonings" WHERE id=(?);
                `,
                {
                    replacements: [zoning_id, zoning_id],
                    type: QueryTypes.DELETE
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: { message: Strings.Zoning.DELETE_SUCCESS }
                });
            } else {
                resolve({
                    code: 400,
                    data: { message: Strings.POST.NOT_EXIST_ID_MESSAGE }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}


const handleUpdateStatus = (zoning) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Zonings.update(
                {
                    status_id: zoning.status_id
                },
                { where: { id: zoning.zoning_id } }
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
const handleGetGeoJSONByID = async (zoning_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let zoningData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Zonings" WHERE id=?) row`,
                {
                    replacements: [zoning_id],
                    type: QueryTypes.SELECT
                }
            );
            if (zoningData) {
                resolve({
                    code: 200,
                    data: {
                        zoning: zoningData,
                    }
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.Message.NOT_FOUND_MESSAGE,
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    })
}

const handleUpdateZoning = (zoning) => {
    console.log(zoning)
    return new Promise(async (resolve, reject) => {
        try {
            await db.Zonings.update(
                {
                    name: zoning.name,
                    purpose: zoning.purpose,
                    area: zoning.area,
                    width: zoning.width,
                    length: zoning.length,
                    address: zoning.address,
                    geometry: zoning.coordinates,
                    ispolygon: zoning.ispolygon,
                    description: zoning.description,
                    province_id: zoning.province_id,
                    district_id: zoning.district_id ? zoning.district_id : null,
                    ward_id: zoning.ward_id ? zoning.ward_id : null,
                    user_id: zoning.user_id,
                    typeof_zoning_id: zoning.typeof_zoning_id,
                    status_id: 1,
                },
                { where: { id: zoning.id } }
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

module.exports = {
    handleGetAllZoning: handleGetAllZoning,
    handleAddZoning: handleAddZoning,
    handleGetGeoJSONZoning: handleGetGeoJSONZoning,
    handleGetGeoJSONZoningPolygon: handleGetGeoJSONZoningPolygon,
    handleGetGeoJSONZoningPolyline: handleGetGeoJSONZoningPolyline,
    handleGetZoningPolygonID: handleGetZoningPolygonID,
    handleGetZoningPolylineDistance: handleGetZoningPolylineDistance,
    handleGetZoningByID: handleGetZoningByID,
    handleGetZoningByUserID: handleGetZoningByUserID,
    handleDeleteZoning: handleDeleteZoning,
    handleUpdateStatus: handleUpdateStatus,
    handleGetGeoJSONByID: handleGetGeoJSONByID,
    handleUpdateZoning: handleUpdateZoning
}