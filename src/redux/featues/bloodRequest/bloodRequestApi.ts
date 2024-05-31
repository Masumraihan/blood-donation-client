import baseApi from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";
import { TUser } from "@/types";

const bloodRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateDonationStatus: build.mutation({
      query: ({ data, id }) => ({
        url: `/donation-request/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateDonationStatusMutation } = bloodRequestApi;

export default bloodRequestApi;
