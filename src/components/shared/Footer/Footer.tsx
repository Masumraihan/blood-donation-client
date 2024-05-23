import logo from "@/assets/logo.png";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Box display='flex' alignItems='center'>
              <Box sx={{ height: 32, mr: 1 }} />
              <Image src={logo} width={80} height={80} alt='logo' />
              <Typography variant='h6' color='text.primary' noWrap>
                LifeLink
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              {["First Link", "Second Link", "Third Link", "Fourth Link"].map((text, index) => (
                <Grid item key={index}>
                  <Link href='#' variant='body2' color='textSecondary' underline='hover'>
                    {text}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Box display='flex' justifyContent='center'>
              <Link href='#' color='inherit' sx={{ mx: 1 }}>
                <Facebook />
              </Link>
              <Link href='#' color='inherit' sx={{ mx: 1 }}>
                <Twitter />
              </Link>
              <Link href='#' color='inherit' sx={{ mx: 1 }}>
                <Instagram />
              </Link>
              <Link href='#' color='inherit' sx={{ mx: 1 }}>
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Typography variant='body2' color='textSecondary' align='center' sx={{ mt: 2 }}>
          © 2020 Nereus. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
