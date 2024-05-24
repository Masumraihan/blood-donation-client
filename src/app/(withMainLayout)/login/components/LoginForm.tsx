"use client";
import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import login from "@/services/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Please provide a valid email" }),
  password: z
    .string({ required_error: "Please provider your password" })
    .min(6, { message: "Your Password must be 6 character" }),
});

const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: FieldValues) => {
    setLoading(true);
    setError("");
    try {
      const res = await login(values, "/");
      if (res?.success) {
        toast.success("Login successful");
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
    email: "user@gmail.com",
    password: "123456",
  };
  return (
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
      {error && (
        <Typography component='p' sx={{ color: "red", mt: 1 }}>
          {error}
        </Typography>
      )}
      <LoadingButton
        variant='contained'
        loading={loading}
        type='submit'
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </LoadingButton>
      <Grid container>
        <Grid item xs>
          <Link href='/login'>Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link href='/register'>{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
    </CForm>
  );
};

export default LoginForm;
