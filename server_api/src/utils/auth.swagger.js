const data = [{
    "message": "Đăng nhập thành công !",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0ODU1OTU2LCJleHAiOjE2NjQ4NjY3NTZ9.YA3M4sKS7rTmBLp1EoUd0J8iUOJBh8WzP7Frp6cuX_4",
    "refeshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0ODU1OTU2fQ.rsjNtG5Jz_u138KDw48UtZPd-RmI_eV9u-mpAlPtSOs"
}]

const Login = {
    tags: ["Authentication"],
    description: "Đăng nhập",
    responses: {
        200: {
            description: "Đăng nhập thành công",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            code: 200,
                            data: data,
                        }
                    }
                }
            }
        }
    }
}

const Register = {
    tags: ["Authentication"],
    description: "Đăng ký tài khoản người dùng",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            phonenumber: {
                                type: "string",
                                description: "Số điện thoại người dùng ",
                                example: "0981302402"
                            }
                        },
                    }
                }
            }
        }

    }
}

const AuthRouteSwagger = {
    "/api/auth/login": {
        post: Login,
    },
    "/api/auth/register": {
        post: Register
    }
}

module.exports = AuthRouteSwagger;