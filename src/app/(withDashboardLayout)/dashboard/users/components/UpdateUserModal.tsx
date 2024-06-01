"use client";
import CForm from "@/components/forms/CForm";
import CSelect from "@/components/forms/CSelect";
import CModal from "@/components/shared/Modal/CModal";
import { userRole, userStatus } from "@/constants";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/featues/user/userApi";
import { tagTypes } from "@/redux/tagTypes";
import revalidateData from "@/services/actions/revalidateData";
import { TUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const updateUserSchema = z
  .object({
    role: z.string(),
    status: z.string(),
  })
  .partial();

type TEditDonationStatusModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const UpdateUserModal = ({ open, setOpen, id }: TEditDonationStatusModalProps) => {
  const [updateUser, { isLoading: dataLoading }] = useUpdateUserMutation();
  const { data, isLoading } = useGetSingleUserQuery(id);
  const handleSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const res = await updateUser({ data: values, id }).unwrap();
      if (res?.success) {
        toast.success("Status updated successfully");
        revalidateData(tagTypes.USER);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultValues = {
    role: data?.role,
    status: data?.status,
  };

  return (
    <>
      <CModal
        open={open}
        setOpen={setOpen}
        title='Update User'
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#ffffff",
          zIndex: 999,
        }}
      >
        {isLoading ? (
          <Typography>Loading....</Typography>
        ) : (
          <CForm
            onSubmit={handleSubmit}
            resolver={zodResolver(updateUserSchema)}
            defaultValues={defaultValues}
          >
            <Stack spacing={2}>
              <CSelect
                label='Role'
                name='role'
                fullWidth
                items={[userRole.ADMIN, userRole.DONOR]}
              />
              <CSelect
                label='Status'
                name='status'
                fullWidth
                items={[userStatus.ACTIVE, userStatus.DEACTIVATE]}
              />
            </Stack>
            <LoadingButton
              variant='contained'
              loading={isLoading}
              type='submit'
              fullWidth
              sx={{ mt: 2 }}
              disabled={dataLoading}
            >
              Update
            </LoadingButton>
          </CForm>
        )}
      </CModal>
    </>
  );
};

export default UpdateUserModal;
