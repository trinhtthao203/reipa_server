const AuthRouteSwagger = require("./auth.swagger");
const UserRouteSwagger = require("./user.swagger");

const swagger = {
    openapi: "3.0.0",
    info: {
        title: "REST API Docs",
        version: "1.0.0"
    },
    servers: [{
        url: "http://localhost:8080"
    }],
    tags: [
        {
            name: "Authentication",
            description: "Xác thực"
        }, {
            name: "Users",
            description: "Tài khoản người dùng"
        },

    ],
    paths: {
        ...AuthRouteSwagger,
        ...UserRouteSwagger
    }
}

module.exports = swagger;