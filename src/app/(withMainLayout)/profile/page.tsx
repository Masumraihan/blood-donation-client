import { authKey } from "@/constants";
import { TUser } from "@/types";
import { Button, Grid, Typography } from "@mui/material";
import { cookies } from "next/headers";
import ChangeProfilePhoto from "./components/ChangeProfilePhoto";
import { redirect } from "next/navigation";
import MyBloodRequest from "./components/MyBloodRequest";
import MyBloodDonation from "./components/MyBloodDonation";
import UpdateProfileButton from "./components/UpdateProfileButton";

const ProfilePage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(authKey.token);
  let data: TUser | undefined;
  if (!token) {
    return redirect("/login");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/my-profile`, {
    headers: {
      authorization: token.value,
    },
    next: {
      tags: ["profile"],
    },
  });
  const result = await res.json();
  data = result?.data;

  return (
    <>
      <>
        <Grid container spacing={2} sx={{ paddingY: "1rem" }}>
          <Grid
            item
            xs={12}
            md={4}
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
            <ChangeProfilePhoto photo={data?.userProfile?.photo} />

            <Typography variant='h6' sx={{ textAlign: "center", marginTop: "1rem" }}>
              {data?.name} Profile
              <UpdateProfileButton data={data} />
            </Typography>
            <Typography variant='body1' sx={{ textAlign: "center", my: "1rem" }}>
              {data?.userProfile.bio}
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
                <Typography variant='body1'>Email Address</Typography>
                <Typography variant='body1'>{data?.email}</Typography>
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
                <Typography variant='body1'>Phone Number</Typography>
                <Typography variant='body1'>{data?.phoneNumber || "N/A"}</Typography>
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
                <Typography variant='body1'>
                  {data?.userProfile?.lastDonationDate || "N/A"}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <Typography variant='body1'>Availability</Typography>
                <Typography variant='body1'>
                  {data?.availability ? "Yes" : "No"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <MyBloodRequest />
            <MyBloodDonation />
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default ProfilePage;
