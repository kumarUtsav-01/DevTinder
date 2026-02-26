// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
      feed: [] 
    },
    reducers: {
        addFeed: (state, action) => {
            return {
                feed: action.payload
            };
        },
        deleteFeed: (state, action) => {
            const updatedFeed = state.feed.filter(user => user._id !== action.payload);

            return {
                feed: updatedFeed
            }
        }
    }
});

export const { addFeed, deleteFeed } = feedSlice.actions;
export default feedSlice.reducer;
