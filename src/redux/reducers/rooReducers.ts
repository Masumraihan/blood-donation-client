import baseApi from "../api/baseApi";
import mobileMenuSlice from "../featues/mobileMenu/mobileMenuSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  mobileMenu: mobileMenuSlice,
};
