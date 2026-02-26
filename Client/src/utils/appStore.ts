import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import feed from "./feedSlice";
import connection from "./connectionSlice";
import request from "./requestSlice";

const store = configureStore({
    reducer: {
        userReducer: user,
        feedReducer: feed,
        connectionReducer: connection,
        requestReducer: request,
    }
});

export default store;
