import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    postList: []
}

export const PostSlice = createSlice({
    name: "postList",
    initialState,
    reducers: {
        storePostList: (state, action) => {
            state.postList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storePostList } = PostSlice.actions

export default PostSlice.reducer