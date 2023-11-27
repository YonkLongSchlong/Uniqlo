import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { value: { id: "", username: "", email: "", password: "" } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = { id: "", username: "", email: "", password: "" };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
