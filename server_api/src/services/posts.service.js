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

const handleUploadImage = async (id, dataImage) => {
    try {
        let max = await db.Images.max('id');
        let newArray = dataImage.map((item, ind) => {
            ++max;
            return {
                "id": max,
                "name": item.filename,
                "post_id": id,
            }
        })
        await db.Images.bulkCreate(newArray)
    } catch (e) {
        console.log(e);
    }
}

const handleAddPost = (post, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const max = await db.Posts.max('id');
            let postData = await db.Posts.create({
                id: max + 1,
                title: post.title,
                price: post.price,
                address: post.address,
                area: post.area,
                juridical_id: post.juridical_id ? post.juridical_id : null,
                furniture_id: post.furniture_id ? post.furniture_id : null,
                structure: post.structure,
                bedroom: post.bedroom,
                toilet: post.toilet,
                geometry: post.coordinates,
                status_id: post.status_id,
                description: post.description,
                province_id: post.province_id ? post.province_id : null,
                district_id: post.district_id ? post.district_id : null,
                ward_id: post.ward_id ? post.ward_id : null,
                street_id: post.street_id ? post.street_id : null,
                user_id: post.user_id,
                typeof_posts_id: post.typeof_posts_id,
                typeof_real_estate_id: post.typeof_real_estate_id,
            })
                .then(async (result) => {
                    handleUploadImage(result.id, dataImage)
                })
            if (postData) {
                resolve({
                    code: 200,
                    data: {
                        message: Strings.POST.ADD_POST_SUCCESS
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

const handleGetPostDistance = (status_id, lat, lng, distance) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT p.*,u.fullname as user_name, u.phonenumber, ROUND(((p.geometry::geography <-> ST_SetSRID(ST_MakePoint(?,?), 4326)::geography))::numeric,2) as dis_m 
                FROM public."Posts" AS p
                LEFT JOIN public."Users" AS u ON p.user_id = u.id
                WHERE ROUND(((p.geometry::geography <-> ST_SetSRID(ST_MakePoint(?,?), 4326)::geography))::numeric,2)<(?) AND p.status_id=(?)
                ORDER BY dis_m ASC
                `,
                {
                    replacements: [lat, lng, lat, lng, distance, status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetGeoJSONPost = async (status_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Posts" WHERE status_id=?) row`,
                {
                    replacements: [status_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: {
                        post: postData,
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

const handleGetAddressByLatLng = async (latlng) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT war.*, pro.name as province_name, d.name as district_name 
                FROM public."Wards" AS war 
                LEFT JOIN public."Provinces" AS pro ON war.province_id=pro.id 
                LEFT JOIN public."Districts" AS d ON war.district_id=d.id
                WHERE ST_Contains(war.geometry, ST_Transform(ST_GeomFromText(?, 4326), 4326))
                `,
                {
                    replacements: [latlng],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: {
                        post: postData,
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
const handleGetTypeofPost = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Typeof_posts.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetTypeofRealEstate = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Typeof_real_estates.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetJuridical = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Juridicals.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetFurniture = async (id, dataImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Furnitures.findAll({
                order: [
                    ['name', 'ASC'],
                ],
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetAll = async (page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await db.Posts.findAndCountAll({
                order: [
                    ['title', 'ASC'],
                ],
                limit: parseInt(size),
                offset: parseInt(page) * parseInt(size),
            });
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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

const handleGetPostByID = (post_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT pos.*, p.name as province_name, d.name as district_name, w.name as ward_name, s.name as street_name,
                u.fullname as user_name, u.phonenumber, u.avatar, j.name as juridical_name, f.name as furniture_name
                FROM public."Posts" AS pos
                LEFT JOIN public."Provinces" AS p ON pos.province_id=p.id 
                LEFT JOIN public."Districts" AS d ON pos.district_id=d.id
                LEFT JOIN public."Wards" AS w ON pos.ward_id=w.id
                LEFT JOIN public."Streets" AS s ON pos.street_id=s.id
                LEFT JOIN public."Users" AS u ON pos.user_id = u.id
                LEFT JOIN public."Juridicals" AS j ON pos.user_id = j.id
                LEFT JOIN public."Furnitures" AS f ON pos.user_id = f.id
                WHERE pos.id=?
                `,
                {
                    replacements: [post_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.POST.NOT_EXIST_ID_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}

const handleGetPostByUserID = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                SELECT pos.*, sta.name as status_name
                FROM public."Posts" AS pos 
                LEFT JOIN public."Status" AS sta ON pos.status_id=sta.id
                WHERE pos.user_id=?
                `,
                {
                    replacements: [user_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
                });
            } else {
                resolve({
                    code: 400,
                    data: {
                        message: Strings.POST.NOT_EXIST_ID_MESSAGE
                    }
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}


const handleUpdateStatus = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Posts.update(
                {
                    status_id: post.status_id,
                },
                { where: { id: post.post_id } }
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
const handleDelete = (post_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `
                DELETE FROM public."Images" WHERE post_id=(?);
                DELETE FROM public."Posts" WHERE id=(?);
                `,
                {
                    replacements: [post_id, post_id],
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

const handleGetGeoJSONPostByID = async (post_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let postData = await sequelize.query(
                `SELECT json_build_object(
                    'type', 'FeatureCollection',
                    'features', json_agg(ST_AsGeoJSON(row.*)::json)
                    )
                FROM (SELECT * FROM public."Posts" WHERE id=?) row`,
                {
                    replacements: [post_id],
                    type: QueryTypes.SELECT
                }
            );
            if (postData) {
                resolve({
                    code: 200,
                    data: postData
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
const handleUpdatePost = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Posts.update(
                {
                    title: post.title,
                    area: post.area,
                    price: post.price,
                    furniture_id: post.furniture_id,
                    juridical_id: post.juridical_id,
                    bedroom: post.bedroom,
                    toilet: post.toilet,
                    structure: post.structure,
                    address: post.address,
                    geometry: post.coordinates,
                    description: post.description,
                    user_id: post.user_id,
                    province_id: post.province_id,
                    district_id: post.district_id ? post.district_id : null,
                    ward_id: post.ward_id ? post.ward_id : null,
                    street_id: post.street_id ? post.street_id : null,
                    typeof_posts_id: post.typeof_posts_id,
                    typeof_real_estate_id: post.typeof_real_estate_id,
                    status_id: 1,
                },
                { where: { id: post.id } }
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
    handleAddPost: handleAddPost,
    handleGetPostDistance: handleGetPostDistance,
    handleGetGeoJSONPost: handleGetGeoJSONPost,
    handleGetAddressByLatLng: handleGetAddressByLatLng,
    handleGetTypeofPost: handleGetTypeofPost,
    handleGetTypeofRealEstate: handleGetTypeofRealEstate,
    handleGetJuridical: handleGetJuridical,
    handleGetFurniture: handleGetFurniture,
    handleGetAll: handleGetAll,
    handleGetPostByID: handleGetPostByID,
    handleGetPostByUserID: handleGetPostByUserID,
    handleUpdateStatus: handleUpdateStatus,
    handleDelete: handleDelete,
    handleGetGeoJSONPostByID: handleGetGeoJSONPostByID,
    handleUpdatePost: handleUpdatePost
}