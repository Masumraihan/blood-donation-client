"use client";
import logo from "@/assets/logo.png";
import GroupIcon from "@mui/icons-material/Group";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import Image from "next/image";

const drawerWidth = 240;

export const dashboardMenus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: <DashboardCustomizeIcon />,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    Icon: <GroupIcon />,
  },
];

interface Props {
  children?: React.ReactNode;
  window?: () => Window;
}

const DashboardSidebar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box
          sx={{ display: "flex", alignItems: "center", color: "#000", textDecoration: "none" }}
          component={Link}
          href='/'
        >
          <Image src={logo} width={50} height={50} alt='logo' />
          <Typography variant='h6' component='h1' noWrap>
            LifeLink
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {dashboardMenus.map(({ name, Icon, path }, index) => (
          <ListItem key={name} disablePadding>
            <ListItemButton LinkComponent={Link} href={path}>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              Dashboard
            </Typography>
          </Box>
          <Box>
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
