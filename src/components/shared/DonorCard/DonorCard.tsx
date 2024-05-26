import placeholder from "@/assets/user_placeholder.png";
import { TUser } from "@/types";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DonorCard = ({ donor }: { donor: TUser }) => {
  return (
    <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
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
        <Image src={placeholder} alt={donor.name} quality={100} width={100} height={100} />
      )}
      <CardContent>
        <Typography variant='h6'>{donor.name}</Typography>
        <Typography variant='body2'>Blood Type: {donor.bloodType}</Typography>
        <Typography variant='body2'>Location: {donor.location}</Typography>
        <Typography variant='body2' color={donor.availability ? "green" : "red"}>
          {donor.availability ? "Available" : "Not Available"}
        </Typography>
        <Button
          variant='outlined'
          href={`/donors/${donor.id}`}
          component={Link}
          sx={{ width: "fit-content" }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default DonorCard;
