// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

type UserState = { user: unknown | null };

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    addUser: (state, action: { payload: unknown }) => {
      return { user: action?.payload };
    },
    deleteUser: () => {
      return { user: null };
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
