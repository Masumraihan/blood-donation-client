"use client";
import CDatePicker from "@/components/forms/CDatePicker";
import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import CSelect from "@/components/forms/CSelect";
import CFullScreenModal from "@/components/shared/FullScreenModal/CFullScreenModal";
import { BloodTypes } from "@/constants";
import { useUpdateProfileMutation } from "@/redux/featues/user/userApi";
import { TUser } from "@/types";
import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

type TUpdateProfileModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TUser | undefined;
};

const UpdateProfileModal = ({ open, setOpen, data }: TUpdateProfileModalProps) => {
  const [error, setError] = useState("");

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const router = useRouter();
  const handleSubmit = async (values: FieldValues) => {
    setError("");

    values.lastDonationDate = dayjs(values?.lastDonationDate).format("DD MMMM YYYY");
    values.age = parseInt(values?.age);
    values.availability = values?.availability === "Yes";
    const updatedValues = {
      name: values?.name,
      email: values?.email,
      age: values?.age,
      bloodType: values?.bloodType,
      lastDonationDate: values?.lastDonationDate,
      availability: values?.availability,
      bio: values?.bio,
      location: values?.location,
      phoneNumber: values?.phoneNumber || "",
    };
    try {
      const response = await updateProfile(updatedValues).unwrap();
      if (response) {
        setOpen(false);
        toast.success("Profile updated successfully");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultValues: Record<string, unknown> = {};

  if (data) {
    const { userProfile, ...userData } = data;

    Object.entries(userData).forEach(([key, value]) => {
      if (key === "availability") {
        defaultValues[key] = value ? "true" : "false";
        return;
      }
      defaultValues[key] = value;
    });
    Object.entries(userProfile).forEach(([key, value]) => {
      if (key === "lastDonationDate") {
        if (value) {
          const formattedDate = dayjs(value, "DD MMMM YYYY");
          defaultValues[key] = formattedDate;
        }
        return;
      }
      defaultValues[key] = value;
    });
  }

  return (
    <CFullScreenModal title='Update Profile' open={open} setOpen={setOpen}>
      <CForm onSubmit={handleSubmit} defaultValues={defaultValues}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={6} lg={3}>
            <CInput fullWidth label='Your Name' name='name' autoComplete='name' autoFocus />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CInput fullWidth label='Email Address' name='email' autoComplete='email' autoFocus />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CInput
              fullWidth
              label='Phone Number'
              name='phoneNumber'
              autoComplete='phoneNumber'
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CInput fullWidth label='Location' name='location' autoComplete='location' autoFocus />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <CSelect fullWidth label='Blood Type' name='bloodType' items={BloodTypes} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CInput fullWidth label='Age' name='age' autoComplete='age' type='number' autoFocus />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CDatePicker
              name='lastDonationDate'
              fullWidth
              label='Last Donation Date'
              disableFuture
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CSelect fullWidth label='Availability' name='availability' items={["Yes", "No"]} />
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
          loading={isLoading}
          type='submit'
          variant='contained'
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
      </CForm>
    </CFullScreenModal>
  );
};

export default UpdateProfileModal;
