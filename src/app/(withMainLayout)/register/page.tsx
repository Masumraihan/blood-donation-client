"use client";
import CDatePicker from "@/components/forms/CDatePicker";
import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import CSelect from "@/components/forms/CSelect";
import { BloodTypes } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid Email" }),
  bloodType: z
    .string({ required_error: "Blood type is required" })
    .refine(
      (val) => {
        return BloodTypes.includes(val);
      },
      {
        message: "Please provide a valid blood type (A_POSITIVE)",
      },
    )
    .optional(),
  age: z.string({ required_error: "Age is required" }),
  bio: z.string({ required_error: "Bio is required" }),
  location: z.string({ required_error: "Location is required" }),
  lastDonationDate: z.any({ required_error: "Last donation date is required" }).refine(
    (val) => {
      console.log(dayjs(val).format("DD MMMM YYYY"));
      return typeof dayjs(val).format("DD MMMM YYYY") === "string";
    },
    {
      message: "Please Provide a valid date",
    },
  ),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string({ required_error: "Please type your password again" })
    .min(6, "Your password should be minimum 6 characters"),
});

const RegisterPage = () => {
  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  const defaultValues = {
    email: "",
    password: "",
    bloodType: "",
    age: "",
    bio: "",
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
            <Typography component='h1' variant='h5' mb={3}>
              Register
            </Typography>
            <CForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(registerFormSchema)}
            >
              <Grid container spacing={1.5} maxWidth='md'>
                <Grid item xs={12} md={6}>
                  <CInput fullWidth label='Your Name' name='name' autoComplete='name' autoFocus />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CInput
                    fullWidth
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CSelect fullWidth label='Blood Type' name='bloodType' items={BloodTypes} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CInput
                    fullWidth
                    label='Age'
                    name='age'
                    autoComplete='age'
                    type='number'
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CInput
                    fullWidth
                    label='Location'
                    name='location'
                    autoComplete='location'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CDatePicker name='lastDonationDate' fullWidth label='Last Donation Date' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CInput
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CInput
                    fullWidth
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    id='confirmPassword'
                    autoComplete='confirm-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CInput fullWidth name='bio' label='bio' id='bio' autoComplete='bio' row={6} />
                </Grid>
              </Grid>
              <Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='/register'>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link href='/login'>{"Already have an account? Login"}</Link>
                </Grid>
              </Grid>
            </CForm>
          </Box>
        </Box>
      </>
    </Container>
  );
};
export default RegisterPage;
