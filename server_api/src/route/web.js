import express from "express";
import userController from "../controllers/userController";
import provinceController from "../controllers/provinceController";
import districtController from "../controllers/districtController";
import wardController from "../controllers/wardController";
import streetController from "../controllers/streetController";
import zoningController from "../controllers/zoningsController";
import postController from "../controllers/postController";
import typeofZoningController from "../controllers/typeofZoningController";
import imagesController from "../controllers/imageController";
import statusController from "../controllers/statusController";
let router = express.Router();
import dotenv from "dotenv";

dotenv.config();
const middlewareController = require("../controllers/middlewareController");

const initWebRoutes = (app) => {

    //refreshToken
    router.post("/api/refreshToken", middlewareController.refeshToken);

    //user
    router.post("/api/logout", userController.handleLogOut)
    router.post("/api/auth/login", userController.handleLogIn)

    router.get("/api/roles/get-all", middlewareController.verifyTokenAndAdminAuth, userController.getAllRole)

    router.post("/api/user/get-by-id", userController.getByID)
    router.post("/api/user/get-all", middlewareController.verifyTokenAndAdminAuth, userController.getAllUser)
    router.post("/api/user/delete", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser)

    // router.post("/api/user/update_role", userController.updateUser)
    router.post("/api/user/update", userController.updateUser)

    router.post("/api/auth/register", userController.handleRegister)
    router.post("/api/auth/reset-password", userController.handleResetPasword)
    router.post("/api/auth/check-phonenumber", userController.handleCheckPhoneNumber)

    //province
    router.get("/api/provinces/get-all", provinceController.getAllProvince)
    router.post("/api/provinces/update-border-province", provinceController.updateBorderProvince)
    router.post("/api/provinces/geojson-border-province-by-id", provinceController.getBorderProvinceByID)

    //district
    router.get("/api/districts/get-all", districtController.getAllDistrict)
    router.post("/api/districts/get-by-province", districtController.getDistrictByProvince)
    router.post("/api/districts/geojson-border-district-by-id", districtController.getBorderDistrictByID)

    //ward
    router.get("/api/wards/get-all", wardController.getAllWard)
    router.post("/api/wards/geojson-border-ward-by-id", wardController.getBorderWardByID)
    //chua xong
    router.post("/api/wards/update-border", wardController.updateBorder)
    router.post("/api/wards/update-border-id", wardController.updateBorderID)
    router.post("/api/wards/get-by-province-district-id", wardController.getWardSignUp)

    //street
    router.get("/api/streets/get-all", streetController.getAllStreet)
    router.post("/api/streets/get-by-province-district-id", streetController.getStreetSignUp)

    //zoning
    router.post("/api/zoning/get_all", zoningController.getAllZoning)
    router.post("/api/zoning/get_by_id", zoningController.getByID)
    router.post("/api/zoning/geojson_by_id", zoningController.getGeoJSONByID)
    router.post("/api/zoning/get_by_user_id", zoningController.getByUserID)
    router.post("/api/zoning/add_zonings", zoningController.addZoning);
    router.post("/api/zoning/delete_zonings", zoningController.deleteZoning);
    router.post("/api/zoning/geojson_zonings", zoningController.getGeoJSONZoning)
    router.post("/api/zoning/geojson_zonings_polygon", zoningController.getGeoJSONZoningPolygon)
    router.post("/api/zoning/geojson_zonings_polyline", zoningController.getGeoJSONZoningPolyline)
    router.post("/api/zoning/zonings_polygon_id", zoningController.getZoningPolygonID)
    router.post("/api/zoning/zonings_polyline_by_distance", zoningController.getZoningPolylineDistance)
    router.post("/api/zoning/update_status", middlewareController.verifyTokenAndStaffAuth, zoningController.updateStatus)
    router.post("/api/zoning/update", zoningController.updateZoning)

    //type of zoning
    router.get("/api/type_of_zoning/get_all_type", typeofZoningController.getAllType)

    //images
    router.post("/api/images/get_all_by_zoning_id", imagesController.getAllImageByZoningID)
    router.post("/api/images/get_all_by_post_id", imagesController.getAllImageByPostID)
    router.post("/api/images/get_one_by_zoning_id", imagesController.getOneImageByZoningID)
    router.post("/api/images/get_one_by_post_id", imagesController.getOneImageByPostID)

    //posts
    router.post("/api/post/add_post", postController.addPost);
    router.post("/api/post/get_all", postController.getAll);
    router.post("/api/post/get_by_id", postController.getByID);
    router.post("/api/post/get_by_user_id", postController.getByUserID);
    router.post("/api/post/geojson_post", postController.getGeoJSONPost);
    router.post("/api/post/geojson_post_by_id", postController.getGeoJSONPostByID);
    router.post("/api/post/post_by_distance_latlng", postController.getPostByDistanceLatLng);
    router.get("/api/post/type_of_post", postController.getTypeofPost);
    router.get("/api/post/type_of_real_estate", postController.getTypeofRealEstate);
    router.get("/api/post/juridical", postController.getJuridical);
    router.get("/api/post/furniture", postController.getFurniture);
    router.post("/api/post/delete_post", postController.deletePost);
    router.post("/api/post/update_status", middlewareController.verifyTokenAndStaffAuth, postController.updateStatus)
    router.post("/api/post/update", postController.updatePost)
    //get province_id, district_id, ward_id by lat,lng
    router.post("/api/get_address_by_latlng", postController.getAddressByLatLng);

    //status
    router.get("/api/status/get-all", statusController.getAll);

    //rest api
    return app.use("/", router);
}

module.exports = initWebRoutes;