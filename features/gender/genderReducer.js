import { createSlice } from "@reduxjs/toolkit";

export const genderSlice = createSlice({
  name: "gender",
  initialState: { value: "Women" },
  reducers: {
    setGender: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGender } = genderSlice.actions;
export default genderSlice.reducer;
