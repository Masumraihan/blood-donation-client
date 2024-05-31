import DonorPagination from "@/app/(withMainLayout)/donors/components/DonorPagination";
import FilterBloodDonors from "@/components/homePage/FilterBloodDonors";
import { authKey } from "@/constants";
import generateDonorListApiURL from "@/helpers/axios/generateApiUrl";
import { TResponseSuccess, TUser } from "@/types";
import { Box } from "@mui/material";
import { cookies } from "next/headers";
import UserData from "./components/UserData";
import dynamic from "next/dynamic";
import { tagTypes } from "@/redux/tagTypes";

type TParams = {
  searchTerm?: string;
  bloodType?: string;
  availability?: string;
  limit?: string;
  page?: string;
};
const UsersPage = async ({ searchParams }: { searchParams?: TParams }) => {
  const cookie = cookies();
  const URL = generateDonorListApiURL(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user-list?limit=12`,
    {
      searchTerm: searchParams?.searchTerm,
      bloodType: searchParams?.bloodType,
      availability: searchParams?.availability,
      page: searchParams?.page,
    },
  );

  const res = await fetch(`${URL}`, {
    method: "GET",
    headers: {
      authorization: cookie.get(authKey.token)?.value || "",
    },
    next: {
      tags: [tagTypes.USER],
    }
  });

  const result = (await res.json()) as TResponseSuccess<TUser[]>;
  const data: TUser[] = result?.data || [];

  const { total, limit } = result?.meta || {};
  let totalPages = 1;
  if (total && limit) {
    totalPages = Math.ceil(total / limit);
  }

  return (
    <>
      <FilterBloodDonors />
      <UserData data={data} />
      <Box sx={{ textAlign: "center", pt: "1rem" }}>
        <DonorPagination count={totalPages} />
      </Box>
    </>
  );
};

export default UsersPage;
