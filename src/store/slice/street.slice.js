import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    streetList: []
}

export const StreetSlice = createSlice({
    name: "streetList",
    initialState,
    reducers: {
        storeStreetList: (state, action) => {
            state.streetList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeStreetList } = StreetSlice.actions

export default StreetSlice.reducer