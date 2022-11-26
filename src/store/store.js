import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/user.slice";
import roleReducer from "./slice/role.slice";
import provinceReducer from "./slice/province.slice";
import districtReducer from "./slice/district.slice";
import wardReducer from "./slice/ward.slice";
import streetReducer from "./slice/street.slice";
import postReducer from "./slice/post.slice";
import zoningReducer from "./slice/zoning.slice";
import statusReducer from "./slice/status.slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        role: roleReducer,
        province: provinceReducer,
        district: districtReducer,
        ward: wardReducer,
        street: streetReducer,
        post: postReducer,
        zoning: zoningReducer,
        status: statusReducer,
    },
})