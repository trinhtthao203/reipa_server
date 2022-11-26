import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    statusList: []
}

export const StatusSlice = createSlice({
    name: "statusList",
    initialState,
    reducers: {
        storeStatusList: (state, action) => {
            state.statusList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeStatusList } = StatusSlice.actions

export default StatusSlice.reducer