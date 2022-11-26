import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import APIAccessor from "../../services/apiProcessor";
import Constants from "../../constants/index";

export const getUserSetting = createAsyncThunk(
    "userSetting/get",
    async () => {
        const response = (
            await APIAccessor.get({
                path: "userSetting/get",
                headers: {
                    "x-access-token": sessionStorage.getItem(
                        Constants.StorageKeys.ACCESS_TOKEN
                    ),
                },
            })
        ).response;
        return response;
    }
);

export const getTeamList = createAsyncThunk("team/list", async () => {
    const response = (
        await APIAccessor.get({
            path: "team/list",
            headers: {
                "x-access-token": sessionStorage.getItem(
                    Constants.StorageKeys.ACCESS_TOKEN
                ),
            },
        })
    ).response;
    return response;
});

export const getOrganizationList = createAsyncThunk(
    "organization/list",
    async () => {
        const response = (
            await APIAccessor.get({
                path: "organization/list",
                headers: {
                    "x-access-token": sessionStorage.getItem(
                        Constants.StorageKeys.ACCESS_TOKEN
                    ),
                },
            })
        ).response;
        return response;
    }
);

const initialState = {
    userInfo: {},
    userSetting: {},
    teamList: [],
    organizationList: [],
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUserSetting: (state, action) => {
            state.userSetting = action.payload;
        },
        setTeamId: (state, action) => {
            state.userSetting.teamId = action.payload;
        },
        setOrganizationId: (state, action) => {
            state.userSetting.organizationId = action.payload;
        },
        setTeamList: (state, action) => {
            state.teamList = action.payload;
        },
        setOrganizationList: (state, action) => {
            state.organizationList = action.payload;
        },
        storeUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserSetting.fulfilled, (state, action) => {
                state.userSetting = action.payload.data;
                console.log(action.payload);
            })
            .addCase(getTeamList.fulfilled, (state, action) => {
                state.teamList = action.payload.data;
            })
            .addCase(getOrganizationList.fulfilled, (state, action) => {
                state.organizationList = action.payload.data;
            });
    },
});

export const {
    setUserSetting,
    setOrganizationId,
    setTeamId,
    setOrganizationList,
    setTeamList,
    storeUserInfo,
} = profileSlice.actions;

export default profileSlice.reducer;
