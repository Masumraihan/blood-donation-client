import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import { authKey } from "@/constants";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blood-donation-phi.vercel.app/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem(authKey.token);
      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
export default baseApi;
