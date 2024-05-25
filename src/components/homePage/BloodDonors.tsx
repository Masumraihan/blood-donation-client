import placeholder from "@/assets/user_placeholder.png";
import { TUser } from "@/types";

import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const BloodDonors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list?limit=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();
  const data: TUser[] = result?.data || [];

  return (
    <Container>
      <Typography variant='h3' sx={{ textAlign: "center", mt: "1rem" }}>
        Blood Donors
      </Typography>
      <Grid container spacing={3} sx={{ mt: ".5rem" }}>
        {!data.length ? (
          <Typography variant='h5' sx={{ textAlign: "center", mt: "1rem" }}>
            No data found
          </Typography>
        ) : (
          data.slice(0, 10).map((donor) => (
            <Grid item xs={12} md={4} lg={3} key={donor.id}>
              <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {donor?.userProfile?.photo ? (
                  <Image
                    src={donor.userProfile.photo}
                    alt={donor.name}
                    quality={100}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  <Image
                    src={placeholder}
                    alt={donor.name}
                    quality={100}
                    width={100}
                    height={100}
                  />
                )}
                <CardContent>
                  <Typography variant='h6'>{donor.name}</Typography>
                  <Typography variant='body2'>Blood Type: {donor.bloodType}</Typography>
                  <Typography variant='body2'>Location: {donor.location}</Typography>
                  <Typography variant='body2' color={donor.availability ? "green" : "red"}>
                    {donor.availability ? "Available" : "Not Available"}
                  </Typography>
                  <Button variant='contained' href={`/donor/${donor.id}`}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default BloodDonors;
