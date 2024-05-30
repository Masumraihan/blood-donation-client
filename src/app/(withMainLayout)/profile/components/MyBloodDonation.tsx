import { authKey, requestStatus } from "@/constants";
import { TMyBloodInfo } from "@/types";
import { Badge, Box, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BloodDonationCardMenu from "./BloodDonationCardMenu";

const MyBloodDonation = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(authKey.token);
  if (!token) {
    return redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donation-request`, {
    headers: {
      authorization: token.value,
    },
  });
  const result = await res.json();
  const data = result?.data as TMyBloodInfo[];
  return (
    <>
      <Typography
        variant='h5'
        sx={{
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        My blood Donation
      </Typography>
      {!data?.length ? (
        <Typography sx={{ textAlign: "center", mt: "1rem" }}>No blood Donations</Typography>
      ) : (
        <>
          <Grid container sx={{ padding: "1rem" }}>
            {data.map((donation: TMyBloodInfo) => (
              <Grid
                key={donation.id}
                item
                xs={12}
                sm={6}
                lg={4}
                sx={{
                  padding: "1rem",
                  height: "100%",
                  borderRadius: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card sx={{ position: "relative" }}>
                  <Box sx={{ position: "absolute", top: "0", right: "0" }}>
                    <BloodDonationCardMenu id={donation.id} />
                  </Box>
                  <CardContent>
                    <Typography variant='h5' component='h2'>
                      Donation Information
                    </Typography>
                    <Typography variant='body2' component='p'>
                      {dayjs(donation.dateOfDonation).format("DD MMM YYYY")}:
                      {dayjs(donation.dateOfDonation).format("HH:mm a")} - {donation.hospitalName}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      Reason: {donation.reason}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      Requester: {donation?.requester?.name}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      Blood Type: {donation.requester?.bloodType}
                    </Typography>
                    {donation.requestStatus === requestStatus.APPROVED && (
                      <>
                        <Typography variant='body2' component='p'>
                          Email: {donation.requester?.email}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Location: {donation.requester?.location}
                        </Typography>
                      </>
                    )}
                    <Typography variant='body2' component='p'>
                      Status:{" "}
                      <Badge
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          paddingY: "0.2rem",
                          paddingX: "0.5rem",
                          borderRadius: "0.5rem",
                          fontSize: ".7rem",
                          backgroundColor:
                            donation.requestStatus === requestStatus.APPROVED
                              ? "green"
                              : donation.requestStatus === requestStatus.REJECTED
                              ? "red"
                              : "orange",
                        }}
                      >
                        {donation.requestStatus}
                      </Badge>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default MyBloodDonation;
