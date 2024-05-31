"use client";
import CForm from "@/components/forms/CForm";
import CSelect from "@/components/forms/CSelect";
import CModal from "@/components/shared/Modal/CModal";
import { useUpdateDonationStatusMutation } from "@/redux/featues/bloodRequest/bloodRequestApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { revalidateTag } from "next/cache";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const editDonationStatusSchema = z.object({
  requestStatus: z
    .string({ required_error: "Status is required" })
    .min(1, { message: "Status is required" }),
});

type TEditDonationStatusModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const EditDonationStatusModal = ({ open, setOpen, id }: TEditDonationStatusModalProps) => {
  const [updateStatus, { isLoading }] = useUpdateDonationStatusMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const res = await updateStatus({ data: values, id }).unwrap();
      if (res) {
        toast.success("Status updated successfully");
        revalidateTag("profile");
        setOpen(false);
      }
    } catch (error) {}
  };

  const defaultValues = {
    requestStatus: "",
  };

  return (
    <Box>
      <CModal open={open} setOpen={setOpen} title='Edit Donation Status'>
        <CForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(editDonationStatusSchema)}
        >
          <CSelect label='Status' name='requestStatus' fullWidth items={["APPROVED", "REJECTED"]} />
          <LoadingButton
            variant='contained'
            loading={isLoading}
            type='submit'
            fullWidth
            sx={{ mt: 2 }}
          >
            Update
          </LoadingButton>
        </CForm>
      </CModal>
    </Box>
  );
};

export default EditDonationStatusModal;
