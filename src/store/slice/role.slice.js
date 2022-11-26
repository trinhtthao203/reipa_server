import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    roleList: []
}

export const roleSlice = createSlice({
    name: "roleList",
    initialState,
    reducers: {
        storeRoleList: (state, action) => {
            state.roleList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeRoleList } = roleSlice.actions

export default roleSlice.reducer