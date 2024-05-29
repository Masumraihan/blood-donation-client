import { authKey } from "@/constants";
import { TUser } from "@/types";
import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BloodRequestPage = async () => {
  const FORM = dynamic(() => import("./components/BloodRequestForm"), {
    ssr: false,
  });

  const cookieStore = cookies();
  const token = cookieStore.get(authKey.token);
  let data: TUser | undefined;
  if (!token) {
    return redirect("/login");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/my-profile`, {
    headers: {
      authorization: token.value,
    },
    next: {
      tags: ["profile"],
    },
  });
  const result = await res.json();
  data = result?.data;

  return (
    <Box sx={{ marginTop: 4, width: "100%" }}>
      <Typography variant='h4' align='center' gutterBottom>
        Create Blood Request
      </Typography>
      <Box
        sx={{
          padding: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FORM user={data} />
      </Box>
    </Box>
  );
};

export default BloodRequestPage;
