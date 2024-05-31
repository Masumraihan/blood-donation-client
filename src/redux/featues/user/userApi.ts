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
          body: data,
        };
      },
      invalidatesTags: [tagTypes.USER],
    }),

    changePassword: build.mutation({
      query: (data) => {
        return {
          url: "/change-password",
          method: "PATCH",
          body: data,
        };
      },
    }),
    updateUser: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.USER],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUpdateUserMutation,
} = userApi;

export default userApi;
