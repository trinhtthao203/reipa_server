import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    districtList: []
}

export const DistrictSlice = createSlice({
    name: "districtList",
    initialState,
    reducers: {
        storeDistrictList: (state, action) => {
            state.districtList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeDistrictList } = DistrictSlice.actions

export default DistrictSlice.reducer