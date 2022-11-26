import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    provinceList: []
}

export const ProvinceSlice = createSlice({
    name: "provinceList",
    initialState,
    reducers: {
        storeProvinceList: (state, action) => {
            state.provinceList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeProvinceList } = ProvinceSlice.actions

export default ProvinceSlice.reducer