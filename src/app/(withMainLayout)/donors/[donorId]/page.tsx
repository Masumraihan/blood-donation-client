import placeholder from "@/assets/user_placeholder.png";
import { authKey } from "@/constants";
import { TSingleUser, TUser } from "@/types";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type TDonorPageProps = { params: { donorId: string } };
export const generateStaticParams = async ({ params }: TDonorPageProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list?limit=10`);

  const result = await res.json();
  const data = result?.data;
  return data.map((donor: TUser) => ({ donorId: donor.id }));
};

const DonorPage = async ({ params }: TDonorPageProps) => {
  const { donorId } = params;
  const cookie = cookies();
  const token = cookie.get(authKey.token);
  if (!token?.value) {
    redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor/${donorId}`, {
    headers: {
      authorization: token.value as string,
    },
  });
  const result = await res.json();
  const data = result?.data as TSingleUser;
  return (
    <Container
      maxWidth='md'
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        height: "100%",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box component='label'>
        {data?.userProfile?.photo ? (
          <Image
            alt={"profile"}
            src={data?.userProfile?.photo}
            width={150}
            height={150}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <Image
            alt={"profile"}
            src={placeholder}
            width={150}
            height={150}
            style={{ borderRadius: "50%" }}
          />
        )}
      </Box>

      <Typography variant='body1' sx={{ textAlign: "center", my: "1rem" }}>
        {data?.userProfile?.bio}
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant='body1'>Full Name</Typography>
          <Typography variant='body1'>{data?.name}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant='body1'>Location</Typography>
          <Typography variant='body1'>{data?.location}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant='body1'>Blood Type</Typography>
          <Typography variant='body1'>{data?.bloodType}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant='body1'>Age</Typography>
          <Typography variant='body1'>{data?.userProfile?.age || "N/A"}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant='body1'>Last Blood Donation</Typography>
          <Typography variant='body1'>{data?.userProfile?.lastDonationDate || "N/A"}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant='body1'>Availability</Typography>
          <Typography variant='body1'>{data?.availability ? "Yes" : "No"}</Typography>
        </Grid>
        <Typography variant='h6' sx={{ mt: 2 }}>
          Contact Information
        </Typography>
        {data?.contactInfo && (
          <>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography variant='body1'>Email</Typography>
              <Typography variant='body1'>{data?.contactInfo?.email}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography variant='body1'>Phone Number</Typography>
              <Typography variant='body1'>{data?.contactInfo?.phoneNumber}</Typography>
            </Grid>
          </>
        )}
      </Grid>
      <Button sx={{ mt: 1 }} LinkComponent={Link} href={`/donors/${donorId}/request`}>Create a Blood Request</Button>
    </Container>
  );
};

export default DonorPage;
