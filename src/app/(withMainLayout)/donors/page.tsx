import FilterBloodDonors from "@/components/homePage/FilterBloodDonors";
import DonorCard from "@/components/shared/DonorCard/DonorCard";
import generateDonorListApiURL from "@/helpers/axios/generateApiUrl";
import { TResponseSuccess, TUser } from "@/types";
import { Box, Grid, Typography } from "@mui/material";
import DonorPagination from "./components/DonorPagination";

type TParams = {
  searchTerm?: string;
  bloodType?: string;
  availability?: string;
  limit?: string;
  page?: string;
};
const AllDonorsPage = async ({ searchParams }: { searchParams?: TParams }) => {
  const URL = generateDonorListApiURL(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list?limit=12`,
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
      "Content-Type": "application/json",
    },
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

      <Grid container spacing={3} sx={{ my: ".5rem" }}>
        {!data.length ? (
          <Typography variant='h5' sx={{ textAlign: "center", mt: "1rem" }}>
            No data found
          </Typography>
        ) : (
          data?.map((donor) => (
            <Grid item xs={12} md={4} lg={3} key={donor.id}>
              <DonorCard donor={donor} />
            </Grid>
          ))
        )}
      </Grid>
      <Box sx={{ textAlign: "center", pt: "1rem" }}>
        <DonorPagination count={totalPages} />
      </Box>
    </>
  );
};

export default AllDonorsPage;
