import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    wardList: []
}

export const WardSlice = createSlice({
    name: "wardList",
    initialState,
    reducers: {
        storeWardList: (state, action) => {
            state.wardList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeWardList } = WardSlice.actions

export default WardSlice.reducer