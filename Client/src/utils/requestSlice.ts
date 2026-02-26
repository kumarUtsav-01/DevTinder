// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requests: []
    },
    reducers: {
        addRequests: (state, action) => {
            return { requests: action.payload }
        },
        removeRequest: (state, action) => {
            const requestId = action.payload;
            return {
                requests: state.requests.filter(request => request._id !== requestId)
            };
        }
    }
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
