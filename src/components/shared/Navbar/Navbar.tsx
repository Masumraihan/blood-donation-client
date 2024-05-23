"use client";
import logo from "@/assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import * as React from "react";
import AccountMenu from "./components/AccountMenu";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
];

const Navbar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Image src={logo} width={100} height={100} alt='logo' />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.link}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const user = false;

  return (
    <Container sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component='nav' sx={{ backgroundColor: "secondary.main" }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { sx: "flex", sm: "none" },
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
            }}
          >
            {user ? (
              <AccountMenu />
            ) : (
              <Link href='/login'>
                <Button variant='text' sx={{ color: "#000" }}>
                  Login
                </Button>
              </Link>
            )}
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <Image src={logo} width={50} height={50} alt='logo' />
              <Typography variant='h6' component='h1' sx={{ color: "#000" }}>
                LifeLink
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navItems.map((item) => (
                <Link href={item.link} key={item.name}>
                  <Button variant='text' sx={{ color: "#000" }}>
                    {item.name}
                  </Button>
                </Link>
              ))}
              {user ? (
                <AccountMenu />
              ) : (
                <Link href='/login'>
                  <Button variant='text' sx={{ color: "#000" }}>
                    Login
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component='main' sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        <Box>{props.children}</Box>
      </Box>
    </Container>
  );
};

export default Navbar;
