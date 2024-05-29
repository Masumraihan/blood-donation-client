import logo from "@/assets/logo.png";
import { TUser } from "@/types";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import MobileMenuTrigger from "./MobileMenuTrigger";
import MobileNav from "./MobileNav";
import { navItems } from "@/constants";


interface Props {
  data: TUser | undefined;
}

const NavMenus = ({ data }: Props) => {
  return (
    <>
      <AppBar component='nav' sx={{ backgroundColor: "secondary.main" }}>
        <Toolbar>
          <MobileMenuTrigger />
          <Box
            sx={{
              display: { sx: "flex", sm: "none" },
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
            }}
          >
            {data ? (
              <AccountMenu data={data} />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Link href='/login'>
                  <Button variant='text' sx={{ color: "#000" }}>
                    Login
                  </Button>
                </Link>
              </Box>
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
            <Box sx={{ display: "flex", alignItems: "center" }} component={Link} href='/'>
              <Image src={logo} width={50} height={50} alt='logo' />
              <Typography variant='h6' component='h1' sx={{ color: "#000" }} noWrap>
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
              {data ? (
                <AccountMenu data={data} />
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
      <MobileNav navItems={navItems} />
    </>
  );
};

export default NavMenus;
