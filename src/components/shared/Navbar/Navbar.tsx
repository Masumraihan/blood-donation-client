import { authKey } from "@/constants";
import { TUser } from "@/types";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { cookies } from "next/headers";
import NavMenus from "./components/NavMenus";

const Navbar = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get(authKey.token);

  let data: TUser | undefined;
  if (token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/my-profile`, {
      headers: {
        authorization: token.value,
      },
      next: {
        tags: ["profile"],
      },
    });
    const result = await res.json();
    if (result?.success) {
      data = result?.data;
    }
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
