"use client";
import CForm from "@/components/forms/CForm";
import CInput from "@/components/forms/CInput";
import CModal from "@/components/shared/Modal/CModal";
import { useChangePasswordMutation } from "@/redux/featues/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const changePasswordSchema = z.object({
  oldPassword: z.string({ required_error: "Old Password is required" }),
  newPassword: z
    .string({ required_error: "New Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string({ required_error: "Confirm Password is required" }),
});

type TChangePasswordModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePasswordModal = ({ open, setOpen }: TChangePasswordModalProps) => {
  const [error, setError] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (values) => {
    setError("");
    if (values.newPassword !== values.confirmPassword) {
      setError("New password and confirm password not matched");
      return;
    }

    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      const res = await changePassword(data);
      console.log(res.data);
      if (res?.data?.id) {
        toast.success("Password changed successfully");
        setOpen(false);
      } else {
        setError("old password is not matched");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  return (
    <CModal open={open} setOpen={setOpen} title='Change Password'>
      <CForm
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
        defaultValues={defaultValues}
      >
        <Stack spacing={2}>
          <CInput fullWidth label='Old Password' name='oldPassword' type='password' />
          <CInput fullWidth label='New Password' name='newPassword' type='password' />
          <CInput fullWidth label='Confirm Password' name='confirmPassword' type='password' />
          {error && <Typography color='error'>{error}</Typography>}
          <LoadingButton
            disabled={isLoading}
            fullWidth
            loading={isLoading}
            type='submit'
            variant='contained'
          >
            Change Password
          </LoadingButton>
        </Stack>
      </CForm>
    </CModal>
  );
};

export default ChangePasswordModal;
