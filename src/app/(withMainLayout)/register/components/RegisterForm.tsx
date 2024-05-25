"use client";
import CDatePicker from "@/components/forms/CDatePicker";
import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import CSelect from "@/components/forms/CSelect";
import { BloodTypes, authKey } from "@/constants";
import login from "@/services/actions/login";
import register from "@/services/actions/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
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

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async ({ confirmPassword, ...values }: FieldValues) => {
    setLoading(true);
    setError("");
    values.lastDonationDate = dayjs(values.lastDonationDate).format("DD MMMM YYYY");
    values.age = parseInt(values.age);

    if (confirmPassword !== values.password) {
      return setError("password and confirm password not matched");
    }

    try {
      const res = await register(values);
      if (res.success) {
        toast.success("Register successful");
        const loginResponse = await login({ email: values.email, password: values.password }, "/");
        if (loginResponse.success) {
          localStorage.setItem(authKey.token, res?.data?.token);
        } else {
          setError(res.message || "something went wrong");
        }
      } else {
        setError(res.message || "something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const defaultValues = {
    name: "user",
    email: "user@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    bloodType: "B_POSITIVE",
    age: "22",
    bio: "this is bio",
    location: "Dhaka",
    lastDonationDate: dayjs(new Date().getDate()),
  };

  return (
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
          <CInput fullWidth label='Email Address' name='email' autoComplete='email' autoFocus />
        </Grid>

        <Grid item xs={12} md={6}>
          <CSelect fullWidth label='Blood Type' name='bloodType' items={BloodTypes} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CInput fullWidth label='Age' name='age' autoComplete='age' type='number' autoFocus />
        </Grid>

        <Grid item xs={12} md={6}>
          <CInput fullWidth label='Location' name='location' autoComplete='location' autoFocus />
        </Grid>
        <Grid item xs={12} md={6}>
          <CDatePicker name='lastDonationDate' fullWidth label='Last Donation Date' disableFuture />
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
          <CInput fullWidth name='bio' label='bio' id='bio' autoComplete='bio' />
        </Grid>
      </Grid>
      {error && (
        <Typography component='p' sx={{ color: "red", mt: 1 }}>
          {error}
        </Typography>
      )}
      <LoadingButton
        loading={loading}
        type='submit'
        variant='contained'
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </LoadingButton>

      <Grid container>
        <Grid item xs>
          <Link href='/register'>Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link href='/login'>{"Already have an account? Login"}</Link>
        </Grid>
      </Grid>
    </CForm>
  );
};

export default RegisterForm;
