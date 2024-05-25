"use client";
import { toggleMenu } from "@/redux/featues/mobileMenu/mobileMenuSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const MobileMenuTrigger = () => {
  const mobileOpen = useAppSelector((state) => state.mobileMenu.isMenuOpen);
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(toggleMenu(!mobileOpen));
  };
  return (
    <IconButton
      color='inherit'
      aria-label='open drawer'
      edge='start'
      onClick={handleDrawerToggle}
      sx={{ display: { sm: "none" } }}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MobileMenuTrigger;
