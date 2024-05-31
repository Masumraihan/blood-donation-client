import logo from "@/assets/logo.png";
import { Box, Container, Divider, Grid, Link, Typography } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Image from "next/image";
import { navItems } from "@/constants";

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
        <Divider sx={{ mb: 3, border: "1px solid lightgray" }} />
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
              {navItems.map((item, index) => (
                <Grid item key={index}>
                  <Link href={item.link} variant='body2' color='textSecondary' underline='hover'>
                    {item.name}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Box display='flex' justifyContent='center'>
              <Link
                href='https://www.facebook.com/mdmasum.raihan.378/'
                color='inherit'
                sx={{ mx: 1 }}
              >
                <Facebook />
              </Link>
              <Link href='#' color='inherit' sx={{ mx: 1 }}>
                <Twitter />
              </Link>
              <Link href='#' color='inherit' sx={{ mx: 1 }}>
                <Instagram />
              </Link>
              <Link
                href='https://www.linkedin.com/in/md-masum-raihan-35b22b1ab/'
                color='inherit'
                sx={{ mx: 1 }}
              >
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Typography variant='body2' color='textSecondary' align='center' sx={{ mt: 2 }}>
          © 2020 LifeLink. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
