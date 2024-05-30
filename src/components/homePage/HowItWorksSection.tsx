import bloodImage from "@/assets/hero/blood-image.jpg";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Register",
      description: "Sign up on our platform and complete your profile.",
      icon: <PersonAddIcon fontSize='large' />,
    },
    {
      title: "Find a Match",
      description: "Search for donors or recipients based on blood type and location.",
      icon: <SearchIcon fontSize='large' />,
    },
    {
      title: "Donate",
      description: "Contact the match and arrange for a convenient time and place to donate.",
      icon: <LocalHospitalIcon fontSize='large' />,
    },
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant='h4' component='h2' gutterBottom align='center'>
        How It Works
      </Typography>
      <Grid container spacing={4} alignItems='center'>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: { xs: "200px", sm: "400px", md: "500px" },
              position: "relative",
            }}
          >
            <Image
              src={bloodImage}
              placeholder='blur'
              alt='How it works'
              layout='fill'
              objectFit='cover'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {steps.map((step, index) => (
            <Box key={index} mb={4} display='flex' alignItems='flex-start'>
              <Box mr={2}>{step.icon}</Box>
              <Box>
                <Typography variant='h6' component='h3' gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
          <Button variant='contained' color='primary'>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorksSection;
