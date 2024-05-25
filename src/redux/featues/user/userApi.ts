import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
import { TUser } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => {
        return {
          url: "/my-profile",
        };
      },
      transformResponse: (response: { data: TUser }) => response.data,
      providesTags: [tagTypes.USER],
    }),
    updateProfile: build.mutation({
      query: (data) => {
        return {
          url: "/my-profile",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.USER],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateProfileMutation } = userApi;

export default userApi;
