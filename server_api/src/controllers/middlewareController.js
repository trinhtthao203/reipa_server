import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Strings from "../constants/strings";
import Constants from "../constants";

const middlewareController = {

    authenToken: (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];
        //"Beaer [token]"
        const token = authorizationHeader.split(" ")[1];
        if (!token)
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.REQUEST_401
                }
            })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) return res.status(403).json({
                code: 403,
                data: {
                    message: Strings.Message.REQUEST_403
                }
            })
            req.user = data;
            next();
        })
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.authenToken(req, res, () => {
            if (req.user.role_id === 1) {
                next();
            } else {
                res.status(403).json({
                    code: 403,
                    data: {
                        message: "Yêu cầu quyền của Admin"
                    }
                })
            }
        })
    },

    verifyTokenAndStaffAuth: (req, res, next) => {
        middlewareController.authenToken(req, res, () => {
            if (req.user.role_id === 2) {
                next();
            } else {
                res.status(403).json({
                    code: 403,
                    data: {
                        message: "Yêu cầu quyền của nhân viên"
                    }
                })
            }
        })
    },

    refeshToken: async (req, res) => {
        const refeshToken = req.cookies.refreshToken;
        if (!refeshToken)
            return res.status(401).json({
                code: 401,
                data: {
                    message: Strings.Message.REQUEST_401
                }
            })

        jwt.verify(refeshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            console.log(err, data);
            if (err) return res.status(403).json({
                code: 403,
                data: {
                    message: Strings.Message.REQUEST_403
                }
            })

            //neu refreshToken hop le => tao ra mot accessToken moi
            const accessToken = jwt.sign({ id: data.id, role_id: data.role_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: Constants.Api.EXPIRES_IN });
            res.json({ accessToken });
        })
    },

    // logout: async(req, res)=>{
    //     res.clearCookies("refreshToken");
    //     refreshTokens = 
    // }
}

module.exports = middlewareController;