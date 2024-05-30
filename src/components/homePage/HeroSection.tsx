import bloodDonate from "@/assets/hero/blood-donate.jpg";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: { sx: "40vh", md: "60vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth={"lg"}
      >
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item xs={12} sm={6}>
            <Typography variant='h3' component='h1' gutterBottom>
              Donate
              <Typography
                variant='h3'
                component='span'
                sx={{ fontWeight: 600, color: "primary.main", ml: 1 }}
              >
                Blood
              </Typography>
              <br /> Save Life
            </Typography>
            <Typography variant='h6' color='textSecondary' paragraph>
              Blood is a life, pass it on
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              Donating blood is a simple act of kindness that can save lives. Your donation can help
              patients undergoing surgeries, cancer treatments, and those with chronic illnesses. By
              giving blood, you&apos;re making a significant impact on someone&apos;s life and
              health. Join us in our mission to ensure that no one has to worry about the
              availability of blood when they need it the most.
            </Typography>
            <Box mt={4}>
              <Button variant='contained' color='primary' href='#' sx={{ mr: 2 }}>
                login
              </Button>
              <Button variant='outlined' color='secondary' href='#'>
                sign-up
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: { sm: "block", xs: "none" } }}>
              <Image src={bloodDonate} width={700} alt='hero' className='banner-image' />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HeroSection;
