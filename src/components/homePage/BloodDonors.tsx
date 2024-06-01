
import { TUser } from "@/types";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import DonorCard from "../shared/DonorCard/DonorCard";
import FilterBloodDonors from "./FilterBloodDonors";
import Link from "next/link";
import generateDonorListApiURL from "@/helpers/axios/generateApiUrl";

const BloodDonors = async ({
  searchParams,
}: {
  searchParams?: { searchTerm?: string; bloodType?: string; availability?: string };
}) => {
  const URL = generateDonorListApiURL(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list?limit=12`, {
    searchTerm: searchParams?.searchTerm,
    bloodType: searchParams?.bloodType,
    availability: searchParams?.availability,
  });

  const res = await fetch(`${URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();
  const data: TUser[] = result?.data || [];

  return (
    <>
      <Typography variant='h3' sx={{ textAlign: "center", mt: "1rem" }}>
        Blood Donors
      </Typography>
      <FilterBloodDonors />

      <Grid container spacing={3} sx={{ mt: ".5rem" }}>
        {!data.length ? (
          <Typography variant='h5' sx={{ textAlign: "center", mt: "1rem" }}>
            No data found
          </Typography>
        ) : (
          data.slice(0, 10).map((donor) => (
            <Grid item xs={12} md={4} lg={3} key={donor.id}>
              <DonorCard donor={donor} />
            </Grid>
          ))
        )}
      </Grid>
      <Box sx={{ textAlign: "center", mt: "2rem" }}>
        <Button LinkComponent={Link} href='/donors'>
          View Donor List
        </Button>
      </Box>
    </>
  );
};

export default BloodDonors;
