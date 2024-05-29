import { authKey, requestStatus } from "@/constants";
import { TMyBloodInfo } from "@/types";
import { Badge, Card, CardContent, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MyBloodRequest = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(authKey.token);
  if (!token) {
    return redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/my-request`, {
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
        My blood request
      </Typography>
      {!data?.length ? (
        <Typography sx={{ textAlign: "center", mt: "1rem" }}>No blood request</Typography>
      ) : (
        <>
          <Grid container sx={{ padding: "1rem" }}>
            {data.map((request: TMyBloodInfo) => (
              <Grid
                key={request.id}
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
                <Card>
                  <CardContent>
                    <Typography variant='h5' component='h2'>
                      Donation Information
                    </Typography>
                    <Typography variant='body2' component='p'>
                      {dayjs(request.dateOfDonation).format("DD MMM YYYY")}:
                      {dayjs(request.dateOfDonation).format("HH:mm A")} - {request.hospitalName}
                    </Typography>
                    <Typography variant='body2' component='p'>
                      Reason: {request.reason}
                    </Typography>
                    {request.requestStatus === requestStatus.APPROVED && (
                      <>
                        <Typography variant='body2' component='p'>
                          Donor: {request?.donor?.name}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Blood Type: {request.donor?.bloodType}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Email: {request.donor?.email}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Location: {request.donor?.location}
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
                            request.requestStatus === requestStatus.APPROVED
                              ? "green"
                              : request.requestStatus === requestStatus.REJECTED
                              ? "red"
                              : "orange",
                        }}
                      >
                        {request.requestStatus}
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

export default MyBloodRequest;
