import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
};

const mobileMenuSlice = createSlice({
  name: "mobileMenus",
  initialState,
  reducers: {
    toggleMenu: (state, { payload }) => {
      state.isMenuOpen = payload;
    },
  },
});

export const { toggleMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
