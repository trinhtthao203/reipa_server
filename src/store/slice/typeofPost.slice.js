import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    typeofPostList: []
}

export const TypeOfPostSlice = createSlice({
    name: "typeofPostList",
    initialState,
    reducers: {
        storeTypeofPostList: (state, action) => {
            state.typeofPostList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeTypeofPostList } = TypeOfPostSlice.actions

export default TypeOfPostSlice.reducer