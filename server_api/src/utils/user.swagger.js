const ListUser = {
    tags: ["Users"],
    description: "Lấy danh sách người dùng",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            code: 200,
                            data: [],
                        }
                    }
                }
            }
        }
    }
}

const UserRouteSwagger = {
    "/api/users/get-all": {
        get: ListUser,
    },
}

module.exports = UserRouteSwagger;