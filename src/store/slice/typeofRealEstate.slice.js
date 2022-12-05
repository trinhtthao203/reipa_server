import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    typeofRealEstateList: []
}

export const TypeofRealEstateListSlice = createSlice({
    name: "typeofRealEstateList",
    initialState,
    reducers: {
        storeTypeofRealEstateList: (state, action) => {
            state.typeofRealEstateList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeTypeofRealEstateList } = TypeofRealEstateListSlice.actions

export default TypeofRealEstateListSlice.reducer