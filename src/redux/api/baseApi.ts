import axiosBaseQuery from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: () => ({}),
  tagTypes:tagTypesList
});
export default baseApi;
