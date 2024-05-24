"use client";
import placeholder from "@/assets/user_placeholder.png";
import { authKey } from "@/constants";
import logout from "@/services/actions/logout";
import { TMyProfile } from "@/types";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AccountMenu = ({ data }: { data: TMyProfile | undefined }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = () => {
    handleClose();
    router.push("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem(authKey.token);
    logout();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Tooltip title={data?.name}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
          >
            {data?.userProfile?.photo ? (
              <Image
                alt={data?.name}
                src={data?.userProfile?.photo}
                width={32}
                height={32}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Avatar sx={{ width: 32, height: 32, textTransform: "uppercase" }}>
                {data?.name.slice(0, 1)}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleRedirect} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image
            src={data?.userProfile.photo || placeholder}
            width={32}
            height={32}
            alt='user photo'
            style={{ borderRadius: "50%" }}
          />
          My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
export default AccountMenu;
