"use client";
import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Please provide a valid email" }),
  password: z
    .string({ required_error: "Please provider your password" })
    .min(6, { message: "Your Password must be 6 character" }),
});

const LoginPage = () => {
  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <>
        <Box sx={{ maxWidth: "xs" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <CForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(loginFormSchema)}
            >
              <CInput
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                sx={{ mt: 1 }}
              />
              <CInput
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                sx={{ mt: 1 }}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='/login'>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link href='/register'>{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </CForm>
          </Box>
        </Box>
      </>
    </Container>
  );
};
export default LoginPage;
