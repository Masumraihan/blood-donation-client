import about_us from "@/assets/about_us.jpg";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
const AboutUsSection = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
        }}
        maxWidth={"lg"}
      >
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item xs={12} sm={7}>
            <Box
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "400px", md: "500px" },
                position: "relative",
              }}
            >
              <Image
                src={about_us}
                layout='fill'
                objectFit='cover'
                alt='hero'
                className='banner-image'
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant='h3' component='h1' gutterBottom>
              About us
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              At <span style={{ fontWeight: "bold", color: "#f44336" }}>Life Link</span>, our
              mission is to save lives and improve health through the power of blood donation. We
              believe that every drop of blood counts and that a small act of kindness can make a
              significant difference in someone’s life. Our goal is to create a safe and reliable
              blood supply that supports hospitals and medical centers in their efforts to treat
              patients in need.
            </Typography>
            <Box mt={4}>
              <Button variant='contained' color='primary' href='#' sx={{ mr: 2 }}>
                Contact Us
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AboutUsSection;
