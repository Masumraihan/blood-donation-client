import { useState, useEffect } from "react";
import { TUser } from "@/types";
import {
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const BloodDonors = async () => {
  const [data, setData] = useState<TUser[]>([]);
  const [filteredData, setFilteredData] = useState<TUser[]>([]);
  const [searchParams, setSearchParams] = useState({
    bloodType: "",
    location: "",
    availability: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setData(result?.data || []);
      setFilteredData(result?.data || []);
    };
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  useEffect(() => {
    const filterData = () => {
      let filtered = data;
      if (searchParams.bloodType) {
        filtered = filtered.filter((donor) => donor.bloodType === searchParams.bloodType);
      }
      if (searchParams.location) {
        filtered = filtered.filter((donor) =>
          donor.location.toLowerCase().includes(searchParams.location.toLowerCase()),
        );
      }
      if (searchParams.availability) {
        filtered = filtered.filter(
          (donor) => donor.availability === (searchParams.availability === "true"),
        );
      }
      setFilteredData(filtered);
    };
    filterData();
  }, [searchParams, data]);

  return (
    <Container>
      <Typography variant='h3' sx={{ textAlign: "center", mt: "1rem" }}>
        Blood Donors
      </Typography>

      <Grid container spacing={3} sx={{ mt: "1rem", mb: "1rem" }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Blood Type</InputLabel>
            <Select name='bloodType' value={searchParams.bloodType} label='Blood Type'>
              <MenuItem value=''>
                <em>Any</em>
              </MenuItem>
              <MenuItem value='A+'>A+</MenuItem>
              <MenuItem value='A-'>A-</MenuItem>
              <MenuItem value='B+'>B+</MenuItem>
              <MenuItem value='B-'>B-</MenuItem>
              <MenuItem value='AB+'>AB+</MenuItem>
              <MenuItem value='AB-'>AB-</MenuItem>
              <MenuItem value='O+'>O+</MenuItem>
              <MenuItem value='O-'>O-</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label='Location'
            name='location'
            value={searchParams.location}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Availability</InputLabel>
            <Select name='availability' value={searchParams.availability} label='Availability'>
              <MenuItem value=''>
                <em>Any</em>
              </MenuItem>
              <MenuItem value='true'>Available</MenuItem>
              <MenuItem value='false'>Not Available</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredData.slice(0, 10).map((donor) => (
          <Grid item xs={12} md={6} lg={4} key={donor.id}>
            <Card>
              {donor.userProfile.photo && (
                <CardMedia
                  component='img'
                  height='140'
                  image={donor.userProfile.photo}
                  alt={donor.name}
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
        ))}
      </Grid>
    </Container>
  );
};

export default BloodDonors;
