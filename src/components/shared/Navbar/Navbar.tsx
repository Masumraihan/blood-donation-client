import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import NavMenus from "./components/NavMenus";
import { cookies } from "next/headers";
import { authKey } from "@/constants";
import { TMyProfile } from "@/types";

const Navbar = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get(authKey.token);
  let data: TMyProfile | undefined;
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/my-profile`, {
      headers: {
        authorization: token.value,
      },
    });
    const result = await res.json();
    data = result?.data;
  }

  return (
    <Container sx={{ display: "flex" }}>
      <CssBaseline />
      <NavMenus data={data} />
      <Box component='main' sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Container>
  );
};

export default Navbar;
