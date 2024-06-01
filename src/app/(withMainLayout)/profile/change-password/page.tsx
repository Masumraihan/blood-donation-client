import { Stack, Typography } from "@mui/material";
import ChangePassword from "../components/ChangePassword";

const ChangePasswordPage = () => {
  return (
    <Stack maxWidth={500} m='auto'>
      <Typography variant='h5' textAlign='center'>
        {" "}
        Change Password{" "}
      </Typography>
      <ChangePassword />
    </Stack>
  );
};

export default ChangePasswordPage;
