"use client";
import logo from "@/assets/logo.png";
import { toggleMenu } from "@/redux/featues/mobileMenuSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Link from "next/link";

type TNavItems = { name: string; link: string }[];
type TMobileNavProps = {
  window?: () => Window;
  navItems: TNavItems;
};

const MobileNav = ({ window, navItems }: TMobileNavProps) => {
  const mobileOpen = useAppSelector((state) => state.mobileMenu.isMenuOpen);
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(toggleMenu(!mobileOpen));
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
  return (
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
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default MobileNav;
