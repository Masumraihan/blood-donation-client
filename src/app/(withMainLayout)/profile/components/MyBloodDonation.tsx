import { authKey, requestStatus } from "@/constants";
import { TMyBloodInfo } from "@/types";
import { Badge, Card, CardContent, Grid, Typography } from "@mui/material";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MyBloodDonation = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(authKey.token);
  if (!token) {
    return redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/my-donation`, {
    headers: {
      authorization: token.value,
    },
  });
  const result = await res.json();
  const data = result?.data as TMyBloodInfo[];

  return (
    <div>
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
                <Card>
                  <CardContent>
                    <Typography variant='h5' component='h2'>
                      Donation Information
                    </Typography>
                    <Typography color='textSecondary' gutterBottom>
                      {donation.dateOfDonation} - {donation.hospitalName}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      Reason: {donation.reason}
                    </Typography>
                    {donation.requestStatus === requestStatus.APPROVED && (
                      <>
                        <Typography variant='body2' component='p'>
                          Donor: {donation?.donor?.name}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Blood Type: {donation.donor?.bloodType}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Email: {donation.donor?.email}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Location: {donation.donor?.location}
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
                              : "red",
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
    </div>
  );
};

export default MyBloodDonation;
