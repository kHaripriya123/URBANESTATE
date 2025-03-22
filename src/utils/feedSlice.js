import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : {
        feed : [],
        searchFeed : [],
    },

    reducers : {
        addFeed : (state, action)=> {
            state.feed = action.payload;
        },
        updateSearchFeed : (state,action)=> {
            state.searchFeed = action.payload;
        }
    }
})

export const {addFeed, updateSearchFeed} = feedSlice.actions;
export default feedSlice.reducer;