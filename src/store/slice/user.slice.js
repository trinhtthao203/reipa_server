import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: {}
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        storeUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer