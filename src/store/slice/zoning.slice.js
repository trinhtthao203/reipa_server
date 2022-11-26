import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    zoningList: []
}

export const ZoningSlice = createSlice({
    name: "zoningList",
    initialState,
    reducers: {
        storeZoningList: (state, action) => {
            state.zoningList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeZoningList } = ZoningSlice.actions

export default ZoningSlice.reducer